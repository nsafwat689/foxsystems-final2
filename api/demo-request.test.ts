import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import handler, { clientIp, isCloudflare } from "./demo-request";

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
  email: "ahmed@nilehomes.example",
  company: "Nile Homes",
  teamSize: "6-15",
  language: "ar",
};

const ORIGINAL_ENV = { ...process.env };

beforeEach(() => {
  delete process.env.DEMO_SIGNUP_SECRET;
  delete process.env.DEMO_CRM_URL;
  delete process.env.DEMO_SIGNUP_SECRET_HR;
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

  it("routes a pest control request to that demo with its own secret", async () => {
    process.env.DEMO_SIGNUP_SECRET = "real-estate-secret";
    process.env.DEMO_SIGNUP_SECRET_PEST_CONTROL = "pest-secret";
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: any) =>
      String(url).includes("/functions/v1/api/demo/signup")
        ? new Response(JSON.stringify({ url: "https://ipm.example/demo-enter.html?token_hash=x" }), { status: 200 })
        : new Response("{}", { status: 201 })
    );
    const res = mockRes();
    await handler(req({ ...validDemo, product: "pest-control-crm" }), res);

    expect(res.statusCode).toBe(200);
    const [url, init] = fetchSpy.mock.calls[0] as [string, any];
    expect(url).toBe("https://kopseksbjsajsixuswqp.supabase.co/functions/v1/api/demo/signup");
    expect(init.headers["x-demo-secret"]).toBe("pest-secret");
    expect(JSON.parse((fetchSpy.mock.calls[1][1] as any).body).htmlContent).toContain("Pest Control CRM");
  });

  it("routes a medical request to the medical demo's function with its own secret", async () => {
    process.env.DEMO_SIGNUP_SECRET_MEDICAL = "medical-secret";
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: any) =>
      String(url).includes("/functions/v1/demo-signup")
        ? new Response(JSON.stringify({ url: "https://med.example/demo/enter?token_hash=x" }), { status: 200 })
        : new Response("{}", { status: 201 })
    );
    const res = mockRes();
    await handler(req({ ...validDemo, product: "medical-crm" }), res);

    expect(res.statusCode).toBe(200);
    const [url, init] = fetchSpy.mock.calls[0] as [string, any];
    expect(url).toBe("https://klnxievbzoiqjchjaxry.supabase.co/functions/v1/demo-signup");
    expect(init.headers["x-demo-secret"]).toBe("medical-secret");
    expect(JSON.parse((fetchSpy.mock.calls[1][1] as any).body).htmlContent).toContain("Medical CRM");
  });

  it("routes an HR request to the HR demo's function with its own secret", async () => {
    process.env.DEMO_SIGNUP_SECRET_HR = "hr-secret";
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: any) =>
      String(url).includes("kglepsmhcpqqrldntbol")
        ? new Response(JSON.stringify({ url: "https://fox-hr-crm.vercel.app/demo/enter?token_hash=x" }), { status: 200 })
        : new Response("{}", { status: 201 })
    );
    const res = mockRes();
    await handler(req({ ...validDemo, product: "hr-crm" }), res);

    expect(res.statusCode).toBe(200);
    const [url, init] = fetchSpy.mock.calls[0] as [string, any];
    expect(url).toBe("https://kglepsmhcpqqrldntbol.supabase.co/functions/v1/demo-signup");
    expect(init.headers["x-demo-secret"]).toBe("hr-secret");
    expect(JSON.parse((fetchSpy.mock.calls[1][1] as any).body).htmlContent).toContain("HR &amp; Payroll CRM");
  });

  it("refuses a sign-up without an email address", async () => {
    process.env.DEMO_SIGNUP_SECRET = "s3cret";
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const { email: _omit, ...noEmail } = validDemo;
    const res = mockRes();
    await handler(req(noEmail), res);
    expect(res.statusCode).toBe(400);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("emails the visitor their login, in their language, and tells the lead inbox it did", async () => {
    process.env.DEMO_SIGNUP_SECRET_HR = "hr-secret";
    const login = { email: "visitor-ab12@demo.foxhr.app", password: "Demo-Xy7kP3mQ9a", url: "https://fox-hr-crm.vercel.app/login" };
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: any) =>
      String(url).includes("kglepsmhcpqqrldntbol")
        ? new Response(JSON.stringify({ url: "https://fox-hr-crm.vercel.app/demo/enter?token_hash=x", login }), { status: 200 })
        : new Response("{}", { status: 201 })
    );
    const res = mockRes();
    await handler(req({ ...validDemo, product: "hr-crm" }), res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true, url: "https://fox-hr-crm.vercel.app/demo/enter?token_hash=x" }); // the password never reaches the browser
    const visitorMail = JSON.parse((fetchSpy.mock.calls[1][1] as any).body);
    expect(visitorMail.to).toEqual([{ email: "ahmed@nilehomes.example", name: "Ahmed Nabil" }]);
    expect(visitorMail.subject).toContain("فوكس للموارد البشرية");
    expect(visitorMail.htmlContent).toContain("Demo-Xy7kP3mQ9a");
    expect(visitorMail.htmlContent).toContain("visitor-ab12@demo.foxhr.app");
    expect(visitorMail.htmlContent).toContain('dir="rtl"');
    expect(visitorMail.htmlContent).toContain("3 أيام");
    const leadMail = JSON.parse((fetchSpy.mock.calls[2][1] as any).body);
    expect(leadMail.htmlContent).toContain("Login emailed to them");
    expect(leadMail.htmlContent).not.toContain("Demo-Xy7kP3mQ9a");            // your inbox never gets visitors' passwords
  });

  it("schedules the day-2 tips and the last-day email for a new demo, in the visitor's language", async () => {
    process.env.DEMO_SIGNUP_SECRET_HR = "hr-secret";
    const login = { email: "visitor-ab12@demo.foxhr.app", password: "Demo-Xy7kP3mQ9a", url: "https://fox-hr-crm.vercel.app/login" };
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: any) =>
      String(url).includes("kglepsmhcpqqrldntbol")
        ? new Response(JSON.stringify({ url: "https://fox-hr-crm.vercel.app/demo/enter?token_hash=x", returning: false, login }), { status: 200 })
        : new Response("{}", { status: 201 })
    );
    const before = Date.now();
    await handler(req({ ...validDemo, product: "hr-crm" }), mockRes());

    expect(fetchSpy).toHaveBeenCalledTimes(5); // signup, login mail, lead mail, 2 follow-ups
    const [day2, last] = [3, 4].map(i => JSON.parse((fetchSpy.mock.calls[i][1] as any).body));
    const hoursAhead = (m: any) => (Date.parse(m.scheduledAt) - before) / 3600_000;
    expect(hoursAhead(day2)).toBeGreaterThan(23.9);
    expect(hoursAhead(day2)).toBeLessThan(24.1);
    expect(hoursAhead(last)).toBeGreaterThan(69.9);
    expect(hoursAhead(last)).toBeLessThan(72);                 // Brevo schedules at most 72 h ahead
    expect(day2.to).toEqual([{ email: "ahmed@nilehomes.example", name: "Ahmed Nabil" }]);
    expect(day2.htmlContent).toContain('dir="rtl"');
    expect(day2.htmlContent).toContain("حاسبة الرواتب");         // HR's own tips
    expect(last.subject).toContain("تنتهي");
    expect(last.htmlContent).toContain("/ar/services/crm#pricing");
    expect(day2.htmlContent).not.toContain("Demo-Xy7kP3mQ9a");  // the password is only in the first email
  });

  it("does not schedule the follow-ups again for a returning visitor", async () => {
    process.env.DEMO_SIGNUP_SECRET = "real-estate-secret";
    const login = { email: "visitor-cd34@demo.foxsystemstech.local", password: "Pw-1", url: "https://fox-realestate-crm-omega.vercel.app/login" };
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: any) =>
      String(url).includes("demo-signup")
        ? new Response(JSON.stringify({ url: "https://fox-realestate-crm-omega.vercel.app/demo/enter?token_hash=y", returning: true, login }), { status: 200 })
        : new Response("{}", { status: 201 })
    );
    await handler(req({ ...validDemo, language: "en" }), mockRes());
    expect(fetchSpy).toHaveBeenCalledTimes(3); // signup, login mail, lead mail — nothing scheduled
    expect(fetchSpy.mock.calls.some(c => JSON.parse(String((c[1] as any)?.body ?? "{}")).scheduledAt)).toBe(false);
  });

  it("needs the pest control secret even when the real estate one is set", async () => {
    process.env.DEMO_SIGNUP_SECRET = "real-estate-secret";
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}", { status: 201 }));
    const res = mockRes();
    await handler(req({ ...validDemo, product: "pest-control-crm" }), res);
    expect(res.statusCode).toBe(503);
  });

  it("passes an active trial for the same email or company through as 409 with its end date", async () => {
    process.env.DEMO_SIGNUP_SECRET = "s3cret";
    vi.spyOn(globalThis, "fetch").mockImplementation(async (url: any) =>
      String(url).includes("/api/public/demo-signup")
        ? new Response(JSON.stringify({ error: "active_trial", matched_by: "company", ends_at: "2026-09-30T10:00:00Z" }), { status: 409 })
        : new Response("{}", { status: 201 })
    );
    const res = mockRes();
    await handler(req(validDemo), res);
    expect(res.statusCode).toBe(409);
    expect(res.body).toEqual({ ok: false, code: "active_trial", ends_at: "2026-09-30T10:00:00Z" });
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

describe("clientIp", () => {
  const r = (headers: Record<string, string>) => ({ headers });

  it("uses the visitor's address when the request came through Cloudflare", () => {
    expect(clientIp(r({ "x-forwarded-for": "162.158.217.132", "cf-connecting-ip": "196.138.161.208" })))
      .toBe("196.138.161.208");
    expect(clientIp(r({ "x-forwarded-for": "2a06:98c0:3600::103", "cf-connecting-ip": "41.33.1.2" })))
      .toBe("41.33.1.2");
  });

  it("ignores cf-connecting-ip that did not come from Cloudflare", () => {
    expect(clientIp(r({ "x-forwarded-for": "41.0.0.1, 10.0.0.1", "cf-connecting-ip": "1.2.3.4" })))
      .toBe("41.0.0.1");
  });

  it("falls back to x-real-ip, then unknown", () => {
    expect(clientIp(r({ "x-real-ip": "41.0.0.9" }))).toBe("41.0.0.9");
    expect(clientIp(r({}))).toBe("unknown");
  });

  it("knows Cloudflare's ranges", () => {
    expect(isCloudflare("172.71.141.124")).toBe(true);
    expect(isCloudflare("104.16.0.1")).toBe(true);
    expect(isCloudflare("172.72.0.1")).toBe(false);
    expect(isCloudflare("196.138.161.208")).toBe(false);
  });
});
