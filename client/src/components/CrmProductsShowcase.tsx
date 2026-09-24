/**
 * The three CRM products, shown on the CRM Systems service page.
 *
 * Replaces MedicalCrmShowcase, which showed only the medical system and gave a
 * visitor no way to reach the other two. Each card opens that product's own
 * page, where the full screen gallery, feature list and FAQ live — this is the
 * chooser, not the detail.
 *
 * Thumbnails reuse the first screen of each product's gallery. Missing files
 * fall back to the product icon rather than a broken image: the SPA rewrite
 * answers a missing asset with index.html, so onError is the only reliable
 * signal that a capture is not there.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Bug, Building2, Stethoscope } from "lucide-react";
import { SOLUTIONS } from "@/data/solutions";

const ICONS = { Stethoscope, Building2, Bug };

const T = {
  en: {
    badge: "Built by Fox Systems",
    title: "CRM Systems We Build and Run",
    sub: "Three industry CRMs, each built for one sector rather than configured into it. All three run in production today, in Arabic and English. Open one to see its screens, features and answers to the usual questions.",
    open: "See the system",
    note: "Screens show demonstration data.",
  },
  ar: {
    badge: "من تنفيذ فوكس سيستمز",
    title: "أنظمة CRM من تنفيذنا وتشغيلنا",
    sub: "ثلاثة أنظمة CRM، كلٌّ منها مبنيّ لقطاع واحد لا مكيَّف عليه. وكلها تعمل اليوم في بيئة الإنتاج، بالعربية والإنجليزية. افتح أيًّا منها لتطّلع على شاشاته ومزاياه وإجاباته عن الأسئلة المعتادة.",
    open: "شوف النظام",
    note: "الشاشات تعرض بيانات توضيحية.",
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
    <section className="mt-16 pt-14 border-t border-border">
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
              <Link
                href={`${prefix}/solutions/${solution.id}`}
                className="group flex flex-col h-full rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all"
              >
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
                  <span className="inline-flex items-center gap-2 mt-5 font-semibold text-primary group-hover:gap-3 transition-all">
                    {t.open}
                    <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground/70 mt-6">{t.note}</p>
    </section>
  );
}
