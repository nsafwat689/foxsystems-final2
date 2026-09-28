/**
 * The three CRM products, shown on the CRM Systems service page.
 *
 * Replaces MedicalCrmShowcase, which showed only the medical system and gave a
 * visitor no way to reach the other two. Each card opens that product's own
 * page, where the full screen gallery, feature list and FAQ live — this is the
 * chooser, not the detail.
 *
 * Each card also offers the product's live demo: signing up for a 3-day login
 * is the fastest way from "interested" to "convinced", so it is the primary
 * button and the header's "Try the live demo" lands here (#try-demo).
 *
 * Thumbnails reuse the first screen of each product's gallery. Missing files
 * fall back to the product icon rather than a broken image: the SPA rewrite
 * answers a missing asset with index.html, so onError is the only reliable
 * signal that a capture is not there.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Bug, Building2, PlayCircle, Stethoscope, Users } from "lucide-react";
import { SOLUTIONS } from "@/data/solutions";

const ICONS = { Stethoscope, Building2, Bug, Users };

const T = {
  en: {
    badge: "Built by Fox Systems",
    title: "CRM Systems We Build and Run",
    sub: "Four industry systems, each built for one sector rather than configured into it, in Arabic and English. Open one to watch its video tour, see its screens and features, and try it live for 3 days.",
    open: "See the system",
    demo: "Try it live — 3 days",
    note: "Screens show demonstration data. Every live demo is a real login to the running system with sample data.",
  },
  ar: {
    badge: "من تنفيذ فوكس سيستمز",
    title: "أنظمة CRM من تنفيذنا وتشغيلنا",
    sub: "أربعة أنظمة متخصصة، كلٌّ منها مبنيّ لقطاع واحد لا مكيَّف عليه، بالعربية والإنجليزية. افتح أيًّا منها لتشاهد جولته بالفيديو وتطّلع على شاشاته ومزاياه، وجرّبه مباشرةً لمدة 3 أيام.",
    open: "اطّلع على النظام",
    demo: "جرّبه مباشرة — 3 أيام",
    note: "الشاشات تعرض بيانات توضيحية. كل نسخة تجريبية هي دخول فعلي إلى النظام العامل ببيانات نموذجية.",
  },
};

interface Props {
  language: "en" | "ar";
}

export default function CrmProductsShowcase({ language }: Props) {
  const t = T[language];
  const isArabic = language === "ar";
  const prefix = isArabic ? "/ar" : "";
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  return (
    <section id="try-demo" className="mt-16 pt-14 border-t border-border scroll-mt-24">
      <div className="flex flex-col gap-3 mb-7">
        <span className="pill pill-gold self-start">{t.badge}</span>
        <h2
          className="text-2xl md:text-3xl font-extrabold"
          style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
        >
          {t.title}
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">{t.sub}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {Object.values(SOLUTIONS).map((solution, i) => {
          const Icon = ICONS[solution.icon];
          const copy = isArabic ? solution.ar : solution.en;
          const thumb = copy.screens[0];

          return (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <div className="group flex flex-col h-full rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all">
              <Link href={`${prefix}/solutions/${solution.id}`} className="flex flex-col flex-1">
                <div className="bg-[#0f172a] border-b border-border">
                  {failed[solution.id] ? (
                    <div className="flex items-center justify-center" style={{ aspectRatio: "16 / 9" }}>
                      <Icon className="w-10 h-10 text-white/30" aria-hidden="true" />
                    </div>
                  ) : (
                    <img
                      src={`/showcase/${solution.showcaseBase}/${thumb.id}.webp`}
                      alt={thumb.alt}
                      width={1800}
                      height={1013}
                      loading="lazy"
                      decoding="async"
                      onError={() => setFailed(prev => ({ ...prev, [solution.id]: true }))}
                      className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  )}
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <Icon className="w-6 h-6 text-primary mb-3" aria-hidden="true" />
                  <h3
                    className="text-lg font-extrabold mb-1"
                    style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
                  >
                    {copy.name}
                  </h3>
                  <p className="text-sm font-semibold text-foreground/80 mb-3">{copy.heroTitle}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{copy.heroSub}</p>
                </div>
              </Link>
                <div className="flex flex-wrap items-center gap-3 px-6 pb-6">
                  {solution.liveDemo && (
                    <Link
                      href={`${prefix}/solutions/${solution.id}#demo`}
                      onClick={() => window.trackCTA?.(`live-demo-card-${solution.id}`)}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
                    >
                      <PlayCircle className="w-4 h-4" aria-hidden="true" />
                      {t.demo}
                    </Link>
                  )}
                  <Link
                    href={`${prefix}/solutions/${solution.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                  >
                    {t.open}
                    <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground/70 mt-6">{t.note}</p>
    </section>
  );
}
