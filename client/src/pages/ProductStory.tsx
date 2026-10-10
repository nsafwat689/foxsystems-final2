/** One client story for a CRM product, at /case-studies/<id>. Content: data/productStories.ts. */
import { Link } from "wouter";
import { ArrowRight, CalendarDays, CheckCircle2, MapPin, Quote, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { PRODUCT_STORIES, storySeo } from "@/data/productStories";
import { generateBreadcrumbSchema } from "@/utils/seo";
import SocialLinks from "@/components/SocialLinks";

const H = { fontFamily: "'Plus Jakarta Sans',sans-serif" };

export default function ProductStory({ storyId, language }: { storyId: string; language: "en" | "ar" }) {
  const s = PRODUCT_STORIES.find(x => x.id === storyId)!;
  const isArabic = language === "ar";
  const c = s[language];
  const prefix = isArabic ? "/ar" : "";
  const seo = storySeo(s, language);
  const origin = "https://foxsystemstech.com";
  const breadcrumb = generateBreadcrumbSchema([
    { name: isArabic ? "الرئيسية" : "Home", url: isArabic ? `${origin}/ar` : `${origin}/` },
    { name: isArabic ? "قصص العملاء" : "Case studies", url: `${origin}${prefix}/case-studies` },
    { name: c.title, url: seo.canonicalUrl },
  ]);

  return (
    <div className={`min-h-screen bg-background text-foreground ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <SEOHead config={seo} organizationSchema breadcrumbSchema={breadcrumb} />
      <Header language={language} />

      <section className="relative py-24 bg-hero-pattern overflow-hidden">
        <div className="container relative z-10 max-w-4xl">
          <span className="pill pill-gold mb-5 inline-block">{isArabic ? "قصة عميل" : "Client story"}</span>
          <p className="text-white/70 font-semibold mb-3">{c.client}</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5" style={H}>{c.title}</h1>
          <p className="text-lg text-white/70 leading-relaxed mb-6">{c.summary}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4" />{s.location}</li>
            <li className="flex items-center gap-2"><Users className="w-4 h-4" />{s.teamSize}</li>
            <li className="flex items-center gap-2"><CalendarDays className="w-4 h-4" />{isArabic ? "يعمل منذ" : "Live since"} <span dir="ltr">{s.liveSince}</span></li>
          </ul>
        </div>
      </section>

      <div className="container py-14 max-w-4xl space-y-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {c.results.map(r => (
            <div key={r.label} className="rounded-2xl border border-primary/30 bg-primary/5 p-5 text-center">
              <div className="text-3xl font-extrabold text-primary stat-number" style={H}>{r.metric}</div>
              <div className="text-sm text-muted-foreground mt-1">{r.label}</div>
            </div>
          ))}
        </div>

        <section>
          <h2 className="text-2xl font-extrabold mb-3" style={H}>{isArabic ? "التحدي" : "The challenge"}</h2>
          <p className="text-muted-foreground leading-relaxed">{c.challenge}</p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold mb-4" style={H}>{isArabic ? "ما الذي فعلناه" : "What we did"}</h2>
          <ul className="space-y-3">
            {c.whatWeDid.map(w => <li key={w} className="flex gap-3 leading-relaxed"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />{w}</li>)}
          </ul>
        </section>

        {c.quote && (
          <figure className="rounded-2xl bg-muted/40 border border-border p-8">
            <Quote className="w-8 h-8 text-primary mb-3" aria-hidden="true" />
            <blockquote className="text-lg leading-relaxed">{c.quote}</blockquote>
            {c.quotePerson && <figcaption className="mt-4 text-sm text-muted-foreground font-semibold">{c.quotePerson}</figcaption>}
          </figure>
        )}

        <section className="rounded-2xl bg-[var(--navy)] text-white p-10 text-center">
          <h2 className="text-2xl font-extrabold mb-6" style={H}>{isArabic ? "هل تريد نتائج مماثلة؟" : "Want the same for your team?"}</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg"><Link href={`${prefix}/solutions/${s.solution}`}>{isArabic ? "اكتشف النظام" : "Explore the system"}<ArrowRight className={`w-4 h-4 ${isArabic ? "mr-2 rotate-180" : "ml-2"}`} /></Link></Button>
            <Button asChild size="lg" variant="outline" className="border-white/25 text-white hover:bg-white/10 hover:text-white">
              <Link href={`${prefix}/book?product=${s.solution}`}>{isArabic ? "احجز عرضًا عمليًا" : "Book a walkthrough"}</Link>
            </Button>
          </div>
        </section>
      </div>

      <footer className="bg-[var(--navy)] text-white py-10">
        <div className="container text-center"><SocialLinks isArabic={isArabic} className="justify-center mb-4" /><p className="text-white/40 text-sm">© 2026 Fox Systems. {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."} · Egypt · Saudi Arabia · Kuwait</p></div>
      </footer>
    </div>
  );
}
