// Builds the Fox sales kit: per product and language a one-pager PDF (for clients),
// a demo script PDF (for the team) and an editable proposal (.docx).
//   node build.mjs [outDir]
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import QRCode from "qrcode";
import * as D from "docx";
import { CONTACT, COMMON_OBJECTIONS, PRODUCTS, FOLLOWUPS } from "./sales.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("C:/Users/A.Safwat/node_modules/playwright");
const data = JSON.parse(fs.readFileSync(new URL("./data.json", import.meta.url), "utf8"));
const OUT = process.argv[2] ?? "C:/Users/A.Safwat/Desktop/Fox Sales Kit";
const PUB = "C:/Users/A.Safwat/foxsystems-final2/client/public";
const SITE = "https://foxsystemstech.com";
const ONLY = process.env.ONLY; // e.g. "finance-crm:ar" for a quick check

const FX = data.FX;
const roundNice = (n, step) => Math.max(step, Math.round(n / step) * step);
const price = (p, c) => c === "EGP" ? p.price.egp : c === "USD" ? p.price.usd : c === "SAR" ? roundNice(p.price.usd * FX.SAR_PER_USD, 5) : roundNice(p.price.usd * FX.KWD_PER_USD, p.price.usd * FX.KWD_PER_USD >= 20 ? 1 : 0.5);
const num = n => n.toLocaleString("en-US", { maximumFractionDigits: 1 });
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const firstSentence = s => (s.match(/^.*?[.!؟?](\s|$)/)?.[0] ?? s).trim();
const img = (base, id) => { const f = `${PUB}/showcase/${base}/${id}.webp`; return fs.existsSync(f) ? pathToFileURL(f).href : null; };
const LOGO = pathToFileURL(`${PUB}/logo.jpg`).href;

const T = {
  en: {
    dir: "ltr", problems: "The problems it solves", features: "What the system does", screens: "Inside the system", plans: "Plans and prices",
    plansSub: `The same plans for every Fox system. One monthly price for the whole team, not per user. Prices exclude tax; SAR and KWD at 27 September 2026 exchange rates.`,
    plan: "Plan", users: "Users", perMonth: "per month", included: "Always included", terms: "Contract options", commit: "Our commitments",
    start: "How to start", s1: "Open the 3-day live demo", s1d: "Your own login in a sample company, reset every night.", s2: "Book a 45-minute walkthrough", s2d: "We show it with your workflow and answer every question.",
    s3: "Live in two weeks", s3d: "Standard setup running and your team trained within two weeks.", scan: "Scan for the live demo", note: "Screens show demonstration data.",
    termsList: ["Monthly, with no long commitment", "6-month contract: one month free", "Annual: pay for 10 months instead of 12", "Cancel with two weeks' notice, no exit penalty", "Price locked for the contract term, no setup fee"],
    commits: ["First response within 1 hour, any day", "Critical issues handled on the spot, on site if needed", "Support in Arabic or English", "Backups kept by us, firewall on your data", "Your data leaves with you: export any time"],
    // script
    scriptTitle: "Demo script", internal: "For the Fox sales team · internal", whoT: "Who to call", pitchT: "The 30-second pitch", beforeT: "Before the call",
    before: ["Open the live demo yourself and log in, so nothing loads during the call.", "Check the prospect's company, size and sector online.", "Have the one-pager ready to send straight after the call.", "Plan 15 minutes: 5 questions, 8 demo, 2 next step."],
    discT: "Discovery questions (ask before you show anything)", flowT: "Demo flow", step: "Step", show: "Show", say: "Say", objT: "Objections and answers", closeT: "Closing and next steps",
    close: ["Summarise their answers to the discovery questions in one sentence each.", "Suggest the plan that fits their number of users, and send the one-pager with prices.", "Agree a date: the live demo for their team for 3 days, then a call to review the proposal.", "Send the proposal within 24 hours of that call and book the follow-up call."],
    fuT: "Follow-up messages", fuNote: "Replace the {placeholders} before sending.", rule: "Only promise what is on the website and in this kit. Anything else (discounts, custom work, dates): check with management first.",
  },
  ar: {
    dir: "rtl", problems: "المشكلات التي يحلها", features: "ما يقدّمه النظام", screens: "من داخل النظام", plans: "الباقات والأسعار",
    plansSub: `الباقات نفسها لكل أنظمة فوكس. سعر شهري واحد للفريق كله لا لكل مستخدم. الأسعار لا تشمل الضريبة، والريال والدينار بأسعار صرف 27 سبتمبر 2026.`,
    plan: "الباقة", users: "المستخدمون", perMonth: "شهريًا", included: "مشمول دائمًا", terms: "خيارات التعاقد", commit: "التزاماتنا",
    start: "كيف تبدأ", s1: "افتح النسخة التجريبية الحية لمدة 3 أيام", s1d: "حساب خاص بك في شركة نموذجية تُعاد إلى حالتها كل ليلة.", s2: "احجز عرضًا عمليًا لمدة 45 دقيقة", s2d: "نعرض النظام وفق طريقة عملكم ونجيب عن كل الأسئلة.",
    s3: "جاهز للعمل خلال أسبوعين", s3d: "يصبح التركيب القياسي جاهزًا وفريقك مدرَّبًا خلال أسبوعين.", scan: "امسح الرمز لفتح النسخة التجريبية", note: "الشاشات تعرض بيانات تجريبية.",
    termsList: ["اشتراك شهري بلا التزام طويل", "عقد ستة أشهر: شهر مجاني", "اشتراك سنوي: تدفع 10 أشهر بدلًا من 12", "إلغاء بإشعار قبل أسبوعين بلا غرامة إنهاء", "سعر ثابت طوال مدة العقد وبلا رسوم تركيب"],
    commits: ["أول ردّ خلال ساعة، في أي يوم", "الأعطال الحرجة تُعالَج فورًا، وميدانيًا إن لزم", "دعم بالعربية أو الإنجليزية", "نسخ احتياطية نحتفظ بها وجدار حماية لبياناتك", "بياناتك تخرج معك: صدّرها في أي وقت"],
    scriptTitle: "دليل العرض التوضيحي", internal: "لفريق مبيعات فوكس · للاستخدام الداخلي", whoT: "بمن نتصل", pitchT: "التعريف في 30 ثانية", beforeT: "قبل المكالمة",
    before: ["افتح النسخة التجريبية بنفسك وسجّل الدخول، حتى لا ينتظر العميل تحميل الصفحات.", "اطّلع على شركة العميل وحجمها وقطاعها عبر الإنترنت.", "جهّز الملخص لإرساله مباشرة بعد المكالمة.", "خطط لـ 15 دقيقة: 5 للأسئلة و8 للعرض و2 للخطوة التالية."],
    discT: "أسئلة الاستكشاف (اسألها قبل أن تعرض أي شيء)", flowT: "مسار العرض", step: "الخطوة", show: "اعرض", say: "قل", objT: "الاعتراضات والردود", closeT: "الإغلاق والخطوات التالية",
    close: ["لخّص إجابات العميل عن أسئلة الاستكشاف في جملة لكل منها.", "اقترح الباقة المناسبة لعدد المستخدمين، وأرسل الملخص بالأسعار.", "اتفق على موعد: النسخة التجريبية لفريقه لمدة 3 أيام، ثم مكالمة لمراجعة العرض.", "أرسل العرض خلال 24 ساعة من تلك المكالمة واحجز مكالمة المتابعة."],
    fuT: "رسائل المتابعة", fuNote: "استبدل ما بين {الأقواس} قبل الإرسال.", rule: "لا تَعِد إلا بما هو موجود في الموقع وفي هذا الدليل. وأي شيء آخر (خصومات أو تعديلات خاصة أو مواعيد) راجِع الإدارة أولًا.",
  },
};

const CSS = (dir) => `
@page { size: A4; margin: 0 }
* { box-sizing: border-box } html { -webkit-print-color-adjust: exact; print-color-adjust: exact }
body { margin: 0; font-family: ${dir === "rtl" ? "'Cairo', Tahoma, sans-serif" : "'Inter', 'Segoe UI', Arial, sans-serif"}; color: #0f172a; font-size: 10.5pt; line-height: 1.5 }
.page { width: 210mm; min-height: 297mm; padding: 14mm 14mm 12mm; position: relative; page-break-after: always; overflow: hidden }
.page:last-child { page-break-after: auto }
.band { background: #0A1E3F; color: #fff; margin: -14mm -14mm 7mm; padding: 9mm 14mm 8mm; display: flex; align-items: center; gap: 12px }
.band img { width: 44px; height: 44px; border-radius: 10px }
.band .brand { font-size: 9pt; color: #22D3EE; font-weight: 600; letter-spacing: .04em }
.band h1 { margin: 2px 0 0; font-size: 19pt; line-height: 1.2 }
.band .tag { margin-inline-start: auto; font-size: 8.5pt; color: #cbd5e1; text-align: end }
h2 { font-size: 12.5pt; margin: 5mm 0 2.5mm; color: #0A1E3F } h2:first-of-type { margin-top: 0 }
.hero { font-size: 14pt; font-weight: 700; margin: 0 0 2mm; line-height: 1.35 } .sub { color: #475569; margin: 0 0 4mm }
ul.x { margin: 0; padding-inline-start: 0; list-style: none } ul.x li { padding-inline-start: 18px; position: relative; margin: 0 0 1.6mm }
ul.x li::before { content: "✕"; position: absolute; inset-inline-start: 0; color: #dc2626; font-size: 8pt; top: 2px }
ul.ok li::before { content: "✓"; color: #16a34a; font-size: 9pt }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm 6mm }
.feat b { display: block; font-size: 10pt } .feat span { color: #475569; font-size: 9pt }
.shot { border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: #0f172a } .shot img { width: 100%; display: block } .p2 .shot img { height: 38mm; object-fit: cover; object-position: top }
.cap { font-size: 8.5pt; color: #64748b; margin-top: 1.5mm }
table { width: 100%; border-collapse: collapse; font-size: 9.5pt } th, td { padding: 1.5mm 2.5mm; border-bottom: 1px solid #e2e8f0; text-align: start; vertical-align: top }
th { background: #f1f5f9; color: #334155; font-weight: 600 } td.n { text-align: end; font-variant-numeric: tabular-nums; direction: ltr; white-space: nowrap }
.steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm } .stepc { border: 1px solid #e2e8f0; border-radius: 8px; padding: 3mm }
.stepc .n { width: 22px; height: 22px; border-radius: 50%; background: #2b87f2; color: #fff; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 9pt }
.stepc b { display: block; margin-top: 1.5mm } .stepc .qrin { float: inline-end; width: 22mm; height: 22mm; margin-inline-start: 2mm } .stepc span { font-size: 9pt; color: #475569 }
.foot { position: absolute; bottom: 8mm; inset-inline: 14mm; display: flex; justify-content: space-between; align-items: center; font-size: 9pt; color: #334155; border-top: 1px solid #e2e8f0; padding-top: 3mm }
.foot b { color: #0A1E3F } .qr { display: flex; align-items: center; gap: 8px } .qr img { width: 26mm; height: 26mm }
.box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 3.5mm 4mm } .note { font-size: 8pt; color: #94a3b8 }
.pill { display: inline-block; background: #fef3c7; color: #92400e; border-radius: 99px; padding: 1px 10px; font-size: 8.5pt; font-weight: 600 }
ol.q { margin: 0; padding-inline-start: 5mm } ol.q li { margin-bottom: 1.4mm }
.flow td:first-child { width: 7mm; font-weight: 700; color: #2b87f2 } .flow img { width: 34mm; border-radius: 4px; border: 1px solid #e2e8f0 }
.obj { margin-bottom: 2.6mm } .obj b { display: block } .obj span { color: #334155 }
.msg { border-inline-start: 3px solid #25D366; background: #f0fdf4; padding: 2.5mm 3.5mm; margin-bottom: 3mm; white-space: pre-wrap; font-size: 9.5pt } .msg b { display: block; white-space: normal; margin-bottom: 1mm; color: #166534 }
.warn { background: #fff7ed; border: 1px solid #fed7aa; color: #9a3412; border-radius: 8px; padding: 3mm 4mm; font-size: 9.5pt }
`;
const HEAD = (dir, title) => `<!doctype html><html lang="${dir === "rtl" ? "ar" : "en"}" dir="${dir}"><head><meta charset="utf-8"><title>${esc(title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet"><style>${CSS(dir)}</style></head><body>`;

function band(t, name, sub) {
  return `<div class="band"><img src="${LOGO}" alt=""><div><div class="brand">FOX SYSTEMS</div><h1>${esc(name)}</h1></div><div class="tag">${esc(sub)}</div></div>`;
}
function foot(lang, qr, t) {
  return `<div class="foot"><div><b>Fox Systems</b> · <span dir="ltr">${CONTACT.phone}</span> · WhatsApp · ${CONTACT.email}<br>${CONTACT.site}</div>${qr ? `<div class="qr"><span>${esc(t.scan)}</span><img src="${qr}" alt=""></div>` : ""}</div>`;
}

async function onePager(id, lang, qr) {
  const s = data.SOLUTIONS[id], c = s[lang], t = T[lang], base = s.showcaseBase;
  const feats = c.features.slice(0, 8);
  const shots = c.screens.filter(x => img(base, x.id)).slice(0, 3);
  const plans = data.crmPlans;
  const cur = lang === "ar" ? ["EGP", "SAR", "KWD", "USD"] : ["USD", "EGP", "SAR", "KWD"];
  const curL = { en: { EGP: "EGP", SAR: "SAR", KWD: "KWD", USD: "USD" }, ar: { EGP: "جنيه", SAR: "ريال", KWD: "دينار", USD: "دولار" } }[lang];
  return HEAD(t.dir, c.name) + `
<div class="page">${band(t, c.name, c.badge ?? "")}
  <p class="hero">${esc(c.heroTitle)}</p><p class="sub">${esc(c.heroSub)}</p>
  <div class="grid2" style="grid-template-columns: 1.05fr 1fr">
    <div><h2>${esc(t.problems)}</h2><ul class="x">${c.pains.slice(0, 4).map(p => `<li>${esc(p)}</li>`).join("")}</ul></div>
    <div>${shots[0] ? `<div class="shot"><img src="${img(base, shots[0].id)}"></div><div class="cap">${esc(shots[0].caption)}</div>` : ""}</div>
  </div>
  <h2>${esc(t.features)}</h2>
  <div class="grid2">${feats.map(f => `<div class="feat"><b>${esc(f.title)}</b><span>${esc(firstSentence(f.desc))}</span></div>`).join("")}</div>
  ${foot(lang, null, t)}
</div>
<div class="page p2">
  <h2>${esc(t.screens)}</h2>
  <div class="grid2">${shots.slice(1, 3).map(x => `<div><div class="shot"><img src="${img(base, x.id)}"></div><div class="cap">${esc(x.caption)}</div></div>`).join("")}</div>
  <h2>${esc(t.plans)}</h2><p class="sub" style="font-size:9pt;margin-bottom:2mm">${esc(t.plansSub)}</p>
  <table><thead><tr><th>${esc(t.plan)}</th><th>${esc(t.users)}</th>${cur.map(k => `<th style="text-align:end">${curL[k]} / ${esc(t.perMonth)}</th>`).join("")}</tr></thead>
  <tbody>${plans.map(p => `<tr><td><b>${esc(p.name[lang])}</b></td><td>${esc(p.includes[0][lang])}</td>${cur.map(k => `<td class="n">${num(price(p, k))}</td>`).join("")}</tr>`).join("")}</tbody></table>
  <div class="grid2" style="margin-top:4mm">
    <div class="box"><b>${esc(t.included)}</b><ul class="x ok" style="margin-top:1.5mm">${data.always.map(a => `<li>${esc(a[lang])}</li>`).join("")}</ul></div>
    <div class="box"><b>${esc(t.terms)}</b><ul class="x ok" style="margin-top:1.5mm">${t.termsList.map(a => `<li>${esc(a)}</li>`).join("")}</ul></div>
  </div>
  <h2>${esc(t.start)}</h2>
  <div class="steps">${[[t.s1, t.s1d], [t.s2, t.s2d], [t.s3, t.s3d]].map(([a, b], i) => `<div class="stepc">${i === 0 ? `<img class="qrin" src="${qr}" alt="">` : ""}<span class="n">${i + 1}</span><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join("")}</div>
  <p class="note" style="margin-top:3mm">${esc(c.note ?? t.note)}</p>
  ${foot(lang, null, t)}
</div></body></html>`;
}

const FLOW = `<style>@page { margin: 12mm 0 14mm } .page { min-height: 0; padding-top: 0; padding-bottom: 0; overflow: visible } .band { margin-top: 0; border-radius: 0 0 10px 10px } tr, .obj, .msg, .box, li { break-inside: avoid } h2 { break-after: avoid }</style>`;
function script(id, lang) {
  const s = data.SOLUTIONS[id], c = s[lang], t = T[lang], P = PRODUCTS[id][lang], base = s.showcaseBase;
  const objs = [...P.objections, ...COMMON_OBJECTIONS[lang]];
  return HEAD(t.dir, `${c.name} — ${t.scriptTitle}`) + FLOW + `
<div class="page">${band(t, `${c.name} — ${t.scriptTitle}`, t.internal)}
  <div class="warn">${esc(t.rule)}</div>
  <h2>${esc(t.whoT)}</h2><p>${esc(P.who)}</p>
  <h2>${esc(t.pitchT)}</h2><div class="box"><b>${esc(c.heroTitle)}.</b> ${esc(P.pitch)}</div>
  <h2>${esc(t.beforeT)}</h2><ul class="x ok">${t.before.map(b => `<li>${esc(b)}</li>`).join("")}</ul>
  <h2>${esc(t.discT)}</h2><ol class="q">${P.discovery.map(q => `<li>${esc(q)}</li>`).join("")}</ol>
  <h2>${esc(t.flowT)}</h2>
  <table class="flow"><thead><tr><th>#</th><th>${esc(t.show)}</th><th>${esc(t.say)}</th><th></th></tr></thead><tbody>
  ${P.demo.map(([sid, show, say], i) => `<tr><td>${i + 1}</td><td><b>${esc(show)}</b></td><td>${esc(say)}</td><td>${sid && img(base, sid) ? `<img src="${img(base, sid)}">` : ""}</td></tr>`).join("")}
  </tbody></table>
</div>
<div class="page">
  <h2>${esc(t.objT)}</h2>${objs.map(([q, a]) => `<div class="obj"><b>“${esc(q)}”</b><span>${esc(a)}</span></div>`).join("")}
  <h2>${esc(t.closeT)}</h2><ol class="q">${t.close.map(q => `<li>${esc(q)}</li>`).join("")}</ol>
  <h2>${esc(t.fuT)}</h2><p class="note" style="margin-top:-1mm">${esc(t.fuNote)}</p>
  ${FOLLOWUPS[lang].map(([h, m]) => `<div class="msg"><b>${esc(h)}</b>${esc(m.replaceAll("{product}", c.name))}</div>`).join("")}
  <p class="note">${SITE}/${lang === "ar" ? "ar/" : ""}solutions/${id} · ${SITE}/${lang === "ar" ? "ar/" : ""}book?product=${id}</p>
</div></body></html>`;
}

// ---------------------------------------------------------------- proposal (.docx)
function proposal(id, lang) {
  const s = data.SOLUTIONS[id], c = s[lang], ar = lang === "ar", P = PRODUCTS[id][lang];
  const font = ar ? "Arial" : "Calibri";
  const L = (en, a) => (ar ? a : en);
  const run = (text, o = {}) => new D.TextRun({ text, font, rightToLeft: ar, size: o.size ?? 22, bold: o.bold, color: o.color, italics: o.italics });
  const para = (text, o = {}) => new D.Paragraph({ bidirectional: ar, alignment: ar ? D.AlignmentType.RIGHT : D.AlignmentType.LEFT, spacing: { after: o.after ?? 120 }, heading: o.heading,
    children: Array.isArray(text) ? text : [run(text, o)] });
  const h = text => para(text, { bold: true, size: 28, color: "0A1E3F", after: 160, heading: D.HeadingLevel.HEADING_2 });
  const bullet = text => new D.Paragraph({ bidirectional: ar, alignment: ar ? D.AlignmentType.RIGHT : D.AlignmentType.LEFT, bullet: { level: 0 }, spacing: { after: 60 }, children: [run(text)] });
  const ph = text => run(text, { color: "B45309", bold: true });
  const cell = (text, o = {}) => new D.TableCell({ shading: o.head ? { fill: "EEF2F7" } : undefined, margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new D.Paragraph({ bidirectional: ar, alignment: o.num ? D.AlignmentType.CENTER : ar ? D.AlignmentType.RIGHT : D.AlignmentType.LEFT, children: [run(String(text), { bold: o.head || o.bold, size: 20 })] })] });
  const table = rows => new D.Table({ width: { size: 100, type: D.WidthType.PERCENTAGE }, visuallyRightToLeft: ar, rows: rows.map(r => new D.TableRow({ children: r })) });
  const plans = data.crmPlans;
  const t = T[lang];

  const children = [
    new D.Paragraph({ alignment: ar ? D.AlignmentType.RIGHT : D.AlignmentType.LEFT, children: [new D.ImageRun({ type: "jpg", data: fs.readFileSync(`${PUB}/logo.jpg`), transformation: { width: 70, height: 76 } })] }),
    para(L("Fox Systems", "فوكس سيستمز"), { bold: true, color: "2B87F2", size: 22 }),
    para([run(L("Proposal: ", "عرض: "), { bold: true, size: 40, color: "0A1E3F" }), run(c.name, { bold: true, size: 40, color: "0A1E3F" })], { after: 80 }),
    para([run(L("Prepared for ", "مقدَّم إلى "), { size: 26 }), ph(L("[Client company]", "[اسم الشركة]"))]),
    para([run(L("Attention: ", "عناية: ")), ph(L("[Name, title]", "[الاسم، المنصب]")), run(L("   ·   Date: ", "   ·   التاريخ: ")), ph(L("[date]", "[التاريخ]")), run(L("   ·   Valid until: ", "   ·   صالح حتى: ")), ph(L("[date]", "[التاريخ]"))], { after: 300 }),

    h(L("1. Your situation", "1. وضعكم الحالي")),
    para(L("From our conversation, these are the points this proposal addresses:", "بناءً على حديثنا، هذه هي النقاط التي يعالجها هذا العرض:")),
    ...c.pains.slice(0, 4).map(p => bullet(p)),
    para([ph(L("[Edit: keep the points that apply, add the client's own words and numbers.]", "[عدّل: أبقِ النقاط التي تنطبق، وأضف كلمات العميل وأرقامه.]"))], { after: 240 }),

    h(L("2. The solution", "2. الحل")),
    para(`${c.heroTitle}. ${c.heroSub}`),
    ...c.features.map(f => new D.Paragraph({ bidirectional: ar, alignment: ar ? D.AlignmentType.RIGHT : D.AlignmentType.LEFT, bullet: { level: 0 }, spacing: { after: 60 }, children: [run(f.title + ": ", { bold: true }), run(firstSentence(f.desc))] })),
    para(L(`See it in action: ${SITE}/solutions/${id} (video tour and 3-day live demo).`, `شاهده عمليًا: ${SITE}/ar/solutions/${id} (جولة بالفيديو ونسخة تجريبية حية لمدة 3 أيام).`), { after: 240, italics: true }),

    h(L("3. Plan and price", "3. الباقة والسعر")),
    para(L("One monthly price for the whole team, not per user. Prices exclude tax.", "سعر شهري واحد للفريق كله لا لكل مستخدم. الأسعار لا تشمل الضريبة.")),
    table([
      [cell(t.plan, { head: true }), cell(t.users, { head: true }), cell(L("USD / month", "دولار / شهريًا"), { head: true }), cell(L("EGP / month", "جنيه / شهريًا"), { head: true })],
      ...plans.map(p => [cell(p.name[lang], { bold: true }), cell(p.includes[0][lang]), cell(num(price(p, "USD")), { num: true }), cell(num(price(p, "EGP")), { num: true })]),
    ]),
    para("", { after: 80 }),
    table([[cell(L("What differs", "ما يختلف"), { head: true }), ...plans.map(p => cell(p.name[lang], { head: true, num: true }))],
      ...data.FEATURE_ROWS.map(r => [cell(r.label[lang], { bold: true }), ...r.cells.map(v => cell(v === true ? "✓" : v === false ? "—" : v[lang], { num: true }))])]),
    para("", { after: 80 }),
    para([run(L("Recommended for you: ", "الباقة المقترحة لكم: "), { bold: true }), ph(L("[plan]", "[الباقة]")), run(L(" for ", " لعدد ")), ph(L("[number]", "[عدد]")), run(L(" users, ", " مستخدمين، ")),
      ph(L("[monthly / 6-month / annual]", "[شهري / ستة أشهر / سنوي]")), run(L(" contract: ", ": ")), ph(L("[amount and currency]", "[المبلغ والعملة]")), run(L(" per month.", " شهريًا."))], { after: 240 }),

    h(L("4. What is included", "4. ما يشمله العرض")),
    ...data.always.map(a => bullet(a[lang])),
    ...t.commits.map(a => bullet(a)),
    para(L("Not included: taxes; hardware if the solution needs it (quoted separately); customisation beyond the standard system (scoped and quoted separately).",
      "غير مشمول: الضرائب؛ والأجهزة إن احتاجها الحل (تُسعَّر على حدة)؛ والتخصيص الزائد عن النظام القياسي (يُحدَّد نطاقه ويُسعَّر على حدة)."), { after: 240, italics: true }),

    h(L("5. Timeline", "5. الجدول الزمني")),
    para(L("A standard setup is running and your team trained within two weeks of signing. Customisation, if any, is scoped separately with its own timeline.",
      "يصبح التركيب القياسي جاهزًا وفريقك مدرَّبًا خلال أسبوعين من التوقيع. أما التخصيص، إن وُجد، فيُحدَّد نطاقه بجدول زمني خاص.")),
    table([[cell(L("When", "متى"), { head: true }), cell(L("What happens", "ما يحدث"), { head: true })],
      [cell(L("Week 1", "الأسبوع 1")), cell(L("Requirements meeting, setup to your workflow, users and roles, data migration.", "اجتماع المتطلبات، والضبط وفق سير عملكم، والمستخدمون والصلاحيات، ونقل البيانات."))],
      [cell(L("Week 2", "الأسبوع 2")), cell(L("Team training, go-live, and support from day one.", "تدريب الفريق، والتشغيل، والدعم من اليوم الأول."))],
      [cell(L("After go-live", "بعد التشغيل")), cell(L("Support with a first response within 1 hour, any day.", "دعم مع أول رد خلال ساعة في أي يوم."))]]),
    para("", { after: 160 }),

    h(L("6. Contract terms", "6. شروط التعاقد")),
    ...t.termsList.map(a => bullet(a)),
    bullet(L("Your data is yours: export it any time, or we deliver it within one day.", "بياناتكم ملككم: صدّروها في أي وقت، أو نسلّمها لكم خلال يوم واحد.")),
    para("", { after: 160 }),

    h(L("7. Acceptance", "7. الموافقة")),
    para(L("To go ahead, sign below or reply to this proposal by email.", "للموافقة، وقّعوا أدناه أو ردّوا على هذا العرض بالبريد الإلكتروني.")),
    table([[cell(L("For the client", "عن العميل"), { head: true }), cell(L("For Fox Systems", "عن فوكس سيستمز"), { head: true })],
      [cell(L("Name:", "الاسم:")), cell(L("Name:", "الاسم:"))], [cell(L("Title:", "المنصب:")), cell(L("Title:", "المنصب:"))],
      [cell(L("Signature:", "التوقيع:")), cell(L("Signature:", "التوقيع:"))], [cell(L("Date:", "التاريخ:")), cell(L("Date:", "التاريخ:"))]]),
    para("", { after: 200 }),
    para(`Fox Systems · ${CONTACT.phone} · ${CONTACT.email} · ${CONTACT.site}`, { size: 18, color: "64748B" }),
  ];
  return new D.Document({ creator: "Fox Systems", title: `${c.name} proposal`, styles: { default: { document: { run: { font, size: 22 } } } },
    sections: [{ properties: { page: { margin: { top: 1000, bottom: 1000, left: 1100, right: 1100 } } }, children }] });
}

// ---------------------------------------------------------------- run
const b = await chromium.launch();
const done = [];
for (const id of Object.keys(data.SOLUTIONS)) for (const lang of ["en", "ar"]) {
  if (ONLY && ONLY !== `${id}:${lang}`) continue;
  const name = data.SOLUTIONS[id][lang].name, dir = path.join(OUT, lang === "ar" ? "العربية" : "English", name);
  fs.mkdirSync(dir, { recursive: true });
  const qr = await QRCode.toDataURL(`${SITE}/${lang === "ar" ? "ar/" : ""}solutions/${id}#demo`, { margin: 1, width: 300 });
  const files = lang === "ar" ? { one: `${name} - ملخص.pdf`, script: `${name} - دليل العرض.pdf`, prop: `${name} - نموذج عرض سعر.docx` }
                              : { one: `${name} - One-pager.pdf`, script: `${name} - Demo script.pdf`, prop: `${name} - Proposal template.docx` };
  for (const [key, html] of [["one", await onePager(id, lang, qr)], ["script", script(id, lang)]]) {
    const tmp = path.join(process.env.TEMP, `kit-${id}-${lang}-${key}.html`); fs.writeFileSync(tmp, html);
    const p = await b.newPage(); await p.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" }); await p.evaluate(() => document.fonts.ready);
    await p.pdf({ path: path.join(dir, files[key]), format: "A4", printBackground: true, preferCSSPageSize: true });
    const pages = await p.evaluate(() => document.querySelectorAll(".page").length); await p.close();
    done.push(`${lang} ${id} ${key} (${pages} pages)`);
  }
  fs.writeFileSync(path.join(dir, files.prop), await D.Packer.toBuffer(proposal(id, lang)));
  done.push(`${lang} ${id} proposal`);
}
await b.close();
console.log(done.join("\n"));
