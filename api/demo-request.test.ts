import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import handler from "./demo-request";

function mockRes() {
  const res: any = {
    statusCode: 0,
    body: undefined,
    headers: {} as Record<string, string>,
    setHeader(key: string, value: string) {
      res.headers[key] = value;
      return res;
    },
    status(code: number) {
      res.statusCode = code;
      return res;
    },
    json(payload: unknown) {
      res.body = payload;
      return res;
    },
  };
  return res;
}

const validDemo = {
  name: "Ahmed Nabil",
  phone: "+20 100 000 0000",
  company: "Nile Homes",
  teamSize: "6-15",
  language: "ar",
};

const ORIGINAL_ENV = { ...process.env };

beforeEach(() => {
  delete process.env.DEMO_SIGNUP_SECRET;
  delete process.env.DEMO_CRM_URL;
  process.env.BREVO_API_KEY = "xkeysib_test_key";
  process.env.LEAD_INBOX = "support@foxsystemstech.com";
  process.env.LEAD_FROM = "support@foxsystemstech.com";
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
  vi.restoreAllMocks();
});

const req = (body: unknown) => ({ method: "POST", body, headers: { "x-forwarded-for": "41.0.0.1, 10.0.0.1" } });

describe("POST /api/demo-request", () => {
  it("rejects anything but POST", async () => {
    const res = mockRes();
    await handler({ method: "GET" }, res);
    expect(res.statusCode).toBe(405);
  });

  it("rejects a request without a usable phone number", async () => {
    const res = mockRes();
    await handler(req({ ...validDemo, phone: "12" }), res);
    expect(res.statusCode).toBe(400);
    expect(res.body.code).toBe("invalid");
  });

  it("answers 400, not 500, to a malformed JSON body", async () => {
    const res = mockRes();
    await handler(req("{not json"), res);
    expect(res.statusCode).toBe(400);
  });

  it("swallows honeypot submissions without calling anything", async () => {
    process.env.DEMO_SIGNUP_SECRET = "s3cret";
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const res = mockRes();
    await handler(req({ ...validDemo, website: "http://spam.example" }), res);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true, url: null });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("still emails the lead when the demo is not configured, and says so", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}", { status: 201 }));
    const res = mockRes();
    await handler(req(validDemo), res);

    expect(res.statusCode).toBe(503);
    expect(res.body.code).toBe("not_configured");
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy.mock.calls[0][0]).toBe("https://api.brevo.com/v3/smtp/email");
    expect(JSON.parse((fetchSpy.mock.calls[0][1] as any).body).htmlContent).toContain("NOT created");
  });

  it("creates the account with the shared secret and returns the sign-in URL", async () => {
    process.env.DEMO_SIGNUP_SECRET = "s3cret";
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: any) =>
      String(url).includes("/api/public/demo-signup")
        ? new Response(JSON.stringify({ url: "https://crm.example/demo/enter?token_hash=abc" }), { status: 200 })
        : new Response("{}", { status: 201 })
    );

    const res = mockRes();
    await handler(req(validDemo), res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true, url: "https://crm.example/demo/enter?token_hash=abc" });

    const [crmUrl, crmInit] = fetchSpy.mock.calls[0] as [string, any];
    expect(crmUrl).toBe("https://fox-realestate-crm-omega.vercel.app/api/public/demo-signup");
    expect(crmInit.headers["x-demo-secret"]).toBe("s3cret");
    const sent = JSON.parse(crmInit.body);
    expect(sent.ip).toBe("41.0.0.1");
    expect(sent.language).toBe("ar");

    const mail = JSON.parse((fetchSpy.mock.calls[1][1] as any).body);
    expect(mail.htmlContent).toContain("Nile Homes");
    expect(mail.htmlContent).toContain("they are in the demo now");
  });

  it("reports a CRM failure instead of pretending, and still emails the lead", async () => {
    process.env.DEMO_SIGNUP_SECRET = "s3cret";
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: any) =>
      String(url).includes("/api/public/demo-signup")
        ? new Response("nope", { status: 500 })
        : new Response("{}", { status: 201 })
    );

    const res = mockRes();
    await handler(req(validDemo), res);

    expect(res.statusCode).toBe(502);
    expect(res.body.ok).toBe(false);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it("passes the CRM's rate limit through as 429", async () => {
    process.env.DEMO_SIGNUP_SECRET = "s3cret";
    vi.spyOn(globalThis, "fetch").mockImplementation(async (url: any) =>
      String(url).includes("/api/public/demo-signup")
        ? new Response("{}", { status: 429 })
        : new Response("{}", { status: 201 })
    );
    const res = mockRes();
    await handler(req(validDemo), res);
    expect(res.statusCode).toBe(429);
    expect(res.body.code).toBe("rate_limited");
  });

  it("escapes visitor input in the email", async () => {
    process.env.DEMO_SIGNUP_SECRET = "s3cret";
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: any) =>
      String(url).includes("/api/public/demo-signup")
        ? new Response(JSON.stringify({ url: "https://x/y" }), { status: 200 })
        : new Response("{}", { status: 201 })
    );
    const res = mockRes();
    await handler(req({ ...validDemo, company: "<img src=x onerror=alert(1)>" }), res);
    const mail = JSON.parse((fetchSpy.mock.calls[1][1] as any).body);
    expect(mail.htmlContent).not.toContain("<img");
    expect(mail.htmlContent).toContain("&lt;img");
  });
});
