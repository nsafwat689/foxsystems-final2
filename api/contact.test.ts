import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import handler from "./contact";

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

const validLead = {
  name: "Ahmed",
  email: "ahmed@example.com",
  company: "Example Co",
  phone: "+201000000000",
  service: "CRM System",
  message: "We need a CRM for 40 people.",
};

const ORIGINAL_ENV = { ...process.env };

beforeEach(() => {
  delete process.env.BREVO_API_KEY;
  delete process.env.LEAD_INBOX;
  delete process.env.LEAD_FROM;
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
  vi.restoreAllMocks();
});

function configureMail() {
  process.env.BREVO_API_KEY = "xkeysib_test_key";
  process.env.LEAD_INBOX = "support@foxsystemstech.com";
  process.env.LEAD_FROM = "website@foxsystemstech.com";
}

describe("POST /api/contact", () => {
  it("rejects anything but POST", async () => {
    const res = mockRes();
    await handler({ method: "GET" }, res);

    expect(res.statusCode).toBe(405);
    expect(res.headers.Allow).toBe("POST");
  });

  it("rejects a lead with no usable contact details", async () => {
    const res = mockRes();
    await handler({ method: "POST", body: { name: "", email: "not-an-email" } }, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.code).toBe("invalid");
  });

  it("parses a JSON string body", async () => {
    const res = mockRes();
    await handler({ method: "POST", body: JSON.stringify(validLead) }, res);

    // Valid payload, but mail isn't configured in this test.
    expect(res.statusCode).toBe(503);
    expect(res.body.code).toBe("not_configured");
  });

  it("reports not_configured rather than pretending the lead was delivered", async () => {
    const res = mockRes();
    await handler({ method: "POST", body: validLead }, res);

    expect(res.statusCode).toBe(503);
    expect(res.body).toEqual({ ok: false, code: "not_configured" });
  });

  it("swallows honeypot submissions without sending mail", async () => {
    configureMail();
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const res = mockRes();
    await handler({ method: "POST", body: { ...validLead, website: "http://spam.example" } }, res);

    // Looks like success to the bot, but nothing was delivered.
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("delivers a valid lead and replies to the sender's address", async () => {
    configureMail();
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("{}", { status: 200 }));

    const res = mockRes();
    await handler({ method: "POST", body: validLead }, res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe("https://api.brevo.com/v3/smtp/email");

    const payload = JSON.parse((init as any).body);
    expect(payload.sender.email).toBe("website@foxsystemstech.com");
    expect(payload.to).toEqual([{ email: "support@foxsystemstech.com" }]);
    expect(payload.replyTo.email).toBe("ahmed@example.com");
    expect(payload.htmlContent).toContain("Example Co");
    expect(payload.htmlContent).toContain("We need a CRM for 40 people.");
  });

  it("escapes lead content so a submission can't inject markup into the email", async () => {
    configureMail();
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("{}", { status: 200 }));

    const res = mockRes();
    await handler(
      { method: "POST", body: { ...validLead, name: "<script>alert(1)</script>" } },
      res
    );

    expect(res.statusCode).toBe(200);
    const payload = JSON.parse((fetchSpy.mock.calls[0][1] as any).body);
    expect(payload.htmlContent).not.toContain("<script>");
    expect(payload.htmlContent).toContain("&lt;script&gt;");
  });

  it("surfaces a delivery failure instead of claiming success", async () => {
    configureMail();
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("nope", { status: 422 }));

    const res = mockRes();
    await handler({ method: "POST", body: validLead }, res);

    expect(res.statusCode).toBe(502);
    expect(res.body.code).toBe("delivery_failed");
  });

  it("survives the mail provider being unreachable", async () => {
    configureMail();
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("ECONNRESET"));

    const res = mockRes();
    await handler({ method: "POST", body: validLead }, res);

    expect(res.statusCode).toBe(502);
    expect(res.body.code).toBe("delivery_failed");
  });
});
