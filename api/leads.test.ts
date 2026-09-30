import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import handler, { authorised } from "./leads";
import { recordLead } from "./_leads";

function mockRes() {
  const res: any = { statusCode: 200, body: undefined, headers: {} };
  res.status = (c: number) => { res.statusCode = c; return res; };
  res.json = (b: unknown) => { res.body = b; return res; };
  res.setHeader = (k: string, v: string) => { res.headers[k] = v; };
  return res;
}
const ENV = { LEADS_DB_URL: "https://db.example.co/", LEADS_DB_ANON: "anon-key", LEADS_DB_SECRET: "s".repeat(43), LEADS_ADMIN_KEY: "k".repeat(24) };

describe("lead store", () => {
  const fetchMock = vi.fn();
  beforeEach(() => { Object.assign(process.env, ENV); fetchMock.mockReset(); vi.stubGlobal("fetch", fetchMock); });
  afterEach(() => { for (const k of Object.keys(ENV)) delete process.env[k]; vi.unstubAllGlobals(); });

  it("records a lead through the secret-checked function only", async () => {
    fetchMock.mockResolvedValue(new Response("7", { status: 200 }));
    expect(await recordLead({ source: "booking", name: "Mona", booking_at: "2026-10-08T07:00:00.000Z" })).toBe(true);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://db.example.co/rest/v1/rpc/fox_lead_add");
    expect(JSON.parse(init.body)).toEqual({ p_secret: ENV.LEADS_DB_SECRET, p_lead: { source: "booking", name: "Mona", booking_at: "2026-10-08T07:00:00.000Z" } });
  });

  it("never throws and does nothing when not configured", async () => {
    delete process.env.LEADS_DB_SECRET;
    expect(await recordLead({ source: "contact", name: "X" })).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
    process.env.LEADS_DB_SECRET = ENV.LEADS_DB_SECRET;
    fetchMock.mockRejectedValue(new Error("down"));
    expect(await recordLead({ source: "contact", name: "X" })).toBe(false);
  });

  it("admin key: exact match only", () => {
    expect(authorised(`Bearer ${ENV.LEADS_ADMIN_KEY}`)).toBe(true);
    expect(authorised(`Bearer ${ENV.LEADS_ADMIN_KEY}x`)).toBe(false);
    expect(authorised("Bearer ")).toBe(false);
    expect(authorised(undefined)).toBe(false);
    process.env.LEADS_ADMIN_KEY = "short";
    expect(authorised("Bearer short")).toBe(false); // too short to be trusted
  });

  it("GET needs the key, then lists", async () => {
    const denied = mockRes();
    await handler({ method: "GET", headers: {}, query: {} }, denied);
    expect(denied.statusCode).toBe(401);
    expect(fetchMock).not.toHaveBeenCalled();
    fetchMock.mockResolvedValue(new Response(JSON.stringify([{ id: 1 }]), { status: 200 }));
    const ok = mockRes();
    await handler({ method: "GET", headers: { authorization: `Bearer ${ENV.LEADS_ADMIN_KEY}` }, query: { days: "30" } }, ok);
    expect(ok.body).toEqual({ ok: true, leads: [{ id: 1 }] });
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).p_days).toBe(30);
  });

  it("POST adds an outreach prospect, with notes, behind the key", async () => {
    const denied = mockRes();
    await handler({ method: "POST", headers: {}, body: { name: "Omar", product: "hr-crm" } }, denied);
    expect(denied.statusCode).toBe(401);
    expect(fetchMock).not.toHaveBeenCalled();
    fetchMock.mockResolvedValueOnce(new Response("42", { status: 200 })).mockResolvedValueOnce(new Response(null, { status: 204 }));
    const ok = mockRes();
    await handler({ method: "POST", headers: { authorization: `Bearer ${ENV.LEADS_ADMIN_KEY}` },
      body: { name: "Omar", company: "Nile Foods", phone: "+20 100 000 0000", email: "", product: "hr-crm", language: "ar", notes: "Met at the expo" } }, ok);
    expect(ok.body).toEqual({ ok: true, id: 42 });
    const add = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(fetchMock.mock.calls[0][0]).toMatch(/rpc\/fox_lead_add$/);
    expect(add.p_lead).toMatchObject({ source: "outreach", name: "Omar", company: "Nile Foods", product: "hr-crm", language: "ar" });
    expect(add.p_lead.notes).toBeUndefined();
    const upd = JSON.parse(fetchMock.mock.calls[1][1].body);
    expect(fetchMock.mock.calls[1][0]).toMatch(/rpc\/fox_lead_update$/);
    expect(upd).toMatchObject({ p_id: 42, p_status: null, p_notes: "Met at the expo" });
  });

  it("POST rejects a prospect without a name or with an unknown product", async () => {
    for (const body of [{ product: "hr-crm" }, { name: "A", product: "crypto" }, { name: "A", product: "hr-crm", email: "not-an-email" }]) {
      const r = mockRes();
      await handler({ method: "POST", headers: { authorization: `Bearer ${ENV.LEADS_ADMIN_KEY}` }, body }, r);
      expect(r.statusCode).toBe(400);
    }
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("PATCH validates the status", async () => {
    const bad = mockRes();
    await handler({ method: "PATCH", headers: { authorization: `Bearer ${ENV.LEADS_ADMIN_KEY}` }, body: { id: 1, status: "hacked" } }, bad);
    expect(bad.statusCode).toBe(400);
  });
});
