/**
 * /admin/leads — every demo request, booking and enquiry in one list, with
 * what to do next. Private: needs the LEADS_ADMIN_KEY (kept in this browser
 * after the first sign-in), noindex, not linked from the site.
 */
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Download, LogOut, MessageCircle, MonitorPlay, Phone, RefreshCw, Search, Mail } from "lucide-react";

type Status = "new" | "contacted" | "meeting" | "proposal" | "won" | "lost";
interface Lead {
  id: number; created_at: string; source: "demo" | "booking" | "contact"; product: string; name: string; email: string; phone: string;
  company: string; team_size: string; language: string; details: Record<string, any>; demo_ends_at: string | null; booking_at: string | null;
  status: Status; next_action_at: string | null; notes: string; updated_at: string;
}

const KEY_STORE = "fox_leads_key";
const STATUSES: Status[] = ["new", "contacted", "meeting", "proposal", "won", "lost"];
const STATUS_TONE: Record<Status, string> = { new: "bg-blue-100 text-blue-700", contacted: "bg-amber-100 text-amber-700", meeting: "bg-violet-100 text-violet-700",
  proposal: "bg-cyan-100 text-cyan-700", won: "bg-emerald-100 text-emerald-700", lost: "bg-slate-200 text-slate-600" };
const PRODUCT: Record<string, { en: string; ar: string }> = {
  "real-estate-crm": { en: "Real Estate CRM", ar: "فوكس لإدارة العقارات" }, "medical-crm": { en: "Medical CRM", ar: "فوكس للمبيعات الطبية" },
  "pest-control-crm": { en: "Pest Control CRM", ar: "فوكس لإدارة مكافحة الآفات" }, "hr-crm": { en: "HR & Payroll", ar: "فوكس للموارد البشرية" },
  "it-services": { en: "IT services", ar: "خدمات تقنية المعلومات" },
};
const SOURCE_ICON = { demo: MonitorPlay, booking: CalendarDays, contact: Mail };
const readKey = () => { try { return localStorage.getItem(KEY_STORE) || ""; } catch { return ""; } };
const saveKey = (k: string) => { try { k ? localStorage.setItem(KEY_STORE, k) : localStorage.removeItem(KEY_STORE); } catch { /* private mode */ } };
const fmt = (s: string | null) => s ? new Date(s).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "—";
const waDigits = (p: string) => { const d = p.replace(/\D/g, ""); return d.startsWith("00") ? d.slice(2) : d.startsWith("0") && d.length === 11 ? "2" + d : d; };

/** The WhatsApp opener that fits where the lead is, in their language. */
function waMessage(l: Lead): string {
  const ar = l.language === "ar";
  const first = l.name.split(" ")[0];
  const p = PRODUCT[l.product]?.[ar ? "ar" : "en"] ?? (l.product || (ar ? "أنظمتنا" : "our systems"));
  const now = Date.now();
  if (l.source === "booking" && l.booking_at) {
    const when = new Date(l.booking_at).toLocaleString(ar ? "ar-EG-u-nu-latn" : "en-GB", { timeZone: "Africa/Cairo", weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
    return ar ? `مرحبًا ${first}، معك فريق فوكس سيستمز. نؤكد موعد العرض العملي لـ ${p} يوم ${when} بتوقيت القاهرة. هل تفضّل Google Meet أم Zoom أم Teams؟`
              : `Hello ${first}, this is Fox Systems. Confirming your ${p} walkthrough on ${when} (Cairo time). Would you prefer Google Meet, Zoom or Teams?`;
  }
  if (l.source === "demo") {
    const ended = l.demo_ends_at && new Date(l.demo_ends_at).getTime() < now;
    return ended
      ? (ar ? `مرحبًا ${first}، معك فريق فوكس سيستمز. انتهت تجربتك لـ ${p}؛ ما رأيك فيها؟ يسعدنا ترتيب عرض عملي على بياناتكم أو الإجابة عن أي سؤال عن الأسعار.`
            : `Hello ${first}, this is Fox Systems. Your ${p} demo has ended — what did you think? We'd be glad to run a walkthrough on your own data or answer any pricing questions.`)
      : (ar ? `مرحبًا ${first}، معك فريق فوكس سيستمز. رأينا أنك تجرّب ${p}. هل تحتاج مساعدة في أي خطوة؟ يمكننا أيضًا عرضه عليك في 30 دقيقة.`
            : `Hello ${first}, this is Fox Systems. We saw you're trying the ${p} demo — can we help with anything? We can also walk you through it in 30 minutes.`);
  }
  return ar ? `مرحبًا ${first}، معك فريق فوكس سيستمز بخصوص رسالتك. متى يناسبك أن نتحدث؟`
            : `Hello ${first}, this is Fox Systems about your message. When would suit you for a quick call?`;
}

export default function AdminLeads() {
  const [key, setKey] = useState(readKey);
  const [input, setInput] = useState("");
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [q, setQ] = useState("");
  const [view, setView] = useState<"todo" | "open" | "all">("todo");
  const [source, setSource] = useState<"" | Lead["source"]>("");
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const m = document.createElement("meta"); m.name = "robots"; m.content = "noindex, nofollow"; document.head.appendChild(m);
    document.title = "Leads — Fox Systems";
    return () => { m.remove(); };
  }, []);

  async function load(k = key) {
    if (!k) return;
    setBusy(true); setErr(null);
    try {
      const r = await fetch("/api/leads?days=365", { headers: { authorization: `Bearer ${k}` } });
      if (r.status === 401) { setErr("Wrong key."); saveKey(""); setKey(""); setLeads(null); return; }
      const body = await r.json();
      if (!body.ok) throw new Error(body.code);
      setLeads(body.leads as Lead[]);
    } catch (e: any) { setErr(`Could not load leads (${e?.message ?? "error"}).`); }
    finally { setBusy(false); }
  }
  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [key]);

  async function patch(l: Lead, change: Partial<Pick<Lead, "status" | "notes" | "next_action_at">>) {
    const next = { ...l, ...change };
    setLeads(ls => ls?.map(x => x.id === l.id ? next : x) ?? null);
    const r = await fetch("/api/leads", { method: "PATCH", headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({ id: l.id, status: next.status, notes: next.notes, next_action_at: next.next_action_at }) });
    if (!r.ok) { setErr("Could not save — reloading."); load(); }
  }

  const now = Date.now();
  const isOpen = (l: Lead) => l.status !== "won" && l.status !== "lost";
  const due = (l: Lead) => isOpen(l) && (!l.next_action_at || new Date(l.next_action_at).getTime() <= now + 3600e3);
  const shown = useMemo(() => (leads ?? [])
    .filter(l => view === "all" || (view === "open" ? isOpen(l) : due(l)))
    .filter(l => !source || l.source === source)
    .filter(l => !q || `${l.name} ${l.company} ${l.email} ${l.phone} ${l.notes}`.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => (a.next_action_at ?? a.created_at).localeCompare(b.next_action_at ?? b.created_at)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [leads, view, source, q]);

  const stats = useMemo(() => {
    const ls = leads ?? [], week = now - 7 * 864e5;
    return [
      ["New this week", ls.filter(l => new Date(l.created_at).getTime() > week).length],
      ["To follow up now", ls.filter(due).length],
      ["Demos running", ls.filter(l => l.source === "demo" && l.demo_ends_at && new Date(l.demo_ends_at).getTime() > now).length],
      ["Walkthroughs booked", ls.filter(l => l.source === "booking" && l.booking_at && new Date(l.booking_at).getTime() > now).length],
      ["Won", ls.filter(l => l.status === "won").length],
    ] as const;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leads]);

  function exportCsv() {
    const cols = ["created_at", "source", "product", "name", "company", "email", "phone", "team_size", "language", "status", "next_action_at", "demo_ends_at", "booking_at", "notes"] as const;
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [cols.join(","), ...shown.map(l => cols.map(c => esc(l[c])).join(","))].join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv" })); a.download = "fox-leads.csv"; a.click();
  }

  if (!key) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <form onSubmit={e => { e.preventDefault(); saveKey(input.trim()); setKey(input.trim()); }} className="bg-white rounded-2xl border border-slate-200 p-8 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold text-slate-900">Fox Systems — leads</h1>
        <input type="password" autoComplete="current-password" value={input} onChange={e => setInput(e.target.value)} placeholder="Access key"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-semibold">Open</button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" dir="ltr">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">Leads</h1>
          <div className="flex gap-2">
            <button onClick={() => load()} className="px-3 py-2 border border-slate-300 rounded-lg bg-white inline-flex items-center gap-2 text-sm"><RefreshCw className={`w-4 h-4 ${busy ? "animate-spin" : ""}`} /> Refresh</button>
            <button onClick={exportCsv} className="px-3 py-2 border border-slate-300 rounded-lg bg-white inline-flex items-center gap-2 text-sm"><Download className="w-4 h-4" /> CSV</button>
            <button onClick={() => { saveKey(""); setKey(""); setLeads(null); }} className="px-3 py-2 border border-slate-300 rounded-lg bg-white inline-flex items-center gap-2 text-sm"><LogOut className="w-4 h-4" /> Sign out</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {stats.map(([k, v]) => <div key={k} className="bg-white rounded-xl border border-slate-200 p-4"><div className="text-xs text-slate-500">{k}</div><div className="text-2xl font-bold">{v}</div></div>)}
        </div>

        <div className="flex flex-wrap gap-2 items-center text-sm">
          {([["todo", "Follow up now"], ["open", "All open"], ["all", "Everything"]] as const).map(([k, l]) => (
            <button key={k} onClick={() => setView(k)} className={`px-3 py-1.5 rounded-full border ${view === k ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-300"}`}>{l}</button>
          ))}
          <select value={source} onChange={e => setSource(e.target.value as any)} className="px-3 py-1.5 rounded-full border border-slate-300 bg-white">
            <option value="">All sources</option><option value="demo">Demo</option><option value="booking">Booking</option><option value="contact">Contact form</option>
          </select>
          <label className="relative flex-1 min-w-[180px]"><Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search name, company, phone, notes" className="w-full pl-9 pr-3 py-1.5 rounded-full border border-slate-300" /></label>
        </div>

        {err && <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">{err}</div>}
        {!leads ? <div className="p-10 text-center text-slate-400">Loading…</div> : shown.length === 0 ? (
          <div className="p-10 text-center text-slate-400 bg-white rounded-xl border border-slate-200">{view === "todo" ? "Nothing to follow up right now." : "No leads."}</div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
            {shown.map(l => {
              const Icon = SOURCE_ICON[l.source];
              const overdue = isOpen(l) && l.next_action_at && new Date(l.next_action_at).getTime() < now;
              const phone = waDigits(l.phone || "");
              return (
                <div key={l.id} className="p-3 md:p-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Icon className="w-5 h-5 text-slate-400 shrink-0" aria-label={l.source} />
                    <button onClick={() => setOpen(open === l.id ? null : l.id)} className="text-left flex-1 min-w-[200px]">
                      <div className="font-semibold">{l.name}{l.company && <span className="text-slate-500 font-normal"> · {l.company}</span>}</div>
                      <div className="text-xs text-slate-500">
                        {PRODUCT[l.product]?.en ?? (l.product || "—")} · {l.source} · {fmt(l.created_at)}
                        {l.source === "demo" && l.demo_ends_at && <> · demo {new Date(l.demo_ends_at).getTime() > now ? "ends" : "ended"} {fmt(l.demo_ends_at)}</>}
                        {l.source === "demo" && l.details?.account_created === false && <span className="text-red-600"> · account NOT created</span>}
                        {l.source === "booking" && l.booking_at && <span className="text-violet-700"> · walkthrough {fmt(l.booking_at)} (your time)</span>}
                      </div>
                    </button>
                    <select value={l.status} onChange={e => patch(l, { status: e.target.value as Status })} className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${STATUS_TONE[l.status]}`}>
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <label className={`text-xs inline-flex items-center gap-1 ${overdue ? "text-red-600 font-semibold" : "text-slate-500"}`}>Next
                      <input type="datetime-local" value={l.next_action_at ? new Date(new Date(l.next_action_at).getTime() - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 16) : ""}
                        onChange={e => patch(l, { next_action_at: e.target.value ? new Date(e.target.value).toISOString() : null })}
                        className="border border-slate-300 rounded px-1 py-0.5" /></label>
                    <div className="flex gap-1">
                      {phone && <a href={`https://wa.me/${phone}?text=${encodeURIComponent(waMessage(l))}`} target="_blank" rel="noopener noreferrer" title="WhatsApp with a ready message"
                        onClick={() => { if (l.status === "new") patch(l, { status: "contacted", next_action_at: new Date(now + 2 * 864e5).toISOString() }); }}
                        className="p-2 rounded-lg bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20"><MessageCircle className="w-4 h-4" /></a>}
                      {l.phone && <a href={`tel:${l.phone}`} className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200" title="Call"><Phone className="w-4 h-4" /></a>}
                      {l.email && <a href={`mailto:${l.email}`} className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200" title="Email"><Mail className="w-4 h-4" /></a>}
                    </div>
                  </div>
                  {open === l.id && (
                    <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm">
                      <div className="space-y-1 text-slate-600">
                        <div><b>Email:</b> {l.email || "—"} · <b>Phone:</b> <span dir="ltr">{l.phone || "—"}</span></div>
                        <div><b>Team size:</b> {l.team_size || "—"} · <b>Language:</b> {l.language === "ar" ? "Arabic" : "English"}</div>
                        {Object.entries(l.details || {}).filter(([, v]) => v !== "" && v != null).map(([k, v]) => (
                          <div key={k}><b>{k.replace(/_/g, " ")}:</b> <span className="whitespace-pre-wrap">{String(v)}</span></div>
                        ))}
                      </div>
                      <label className="block"><span className="text-xs text-slate-500">Notes (saved when you leave the box)</span>
                        <textarea defaultValue={l.notes} rows={4} onBlur={e => { if (e.target.value !== l.notes) patch(l, { notes: e.target.value }); }}
                          className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg" /></label>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <p className="text-xs text-slate-400">Every demo request, walkthrough booking and contact enquiry from foxsystemstech.com is recorded here. WhatsApp opens with a message that fits the lead; a new lead moves to “contacted” with a follow-up in two days.</p>
      </div>
    </div>
  );
}
