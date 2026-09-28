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

  it("PATCH validates the status", async () => {
    const bad = mockRes();
    await handler({ method: "PATCH", headers: { authorization: `Bearer ${ENV.LEADS_ADMIN_KEY}` }, body: { id: 1, status: "hacked" } }, bad);
    expect(bad.statusCode).toBe(400);
  });
});
