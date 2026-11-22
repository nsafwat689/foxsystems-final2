interface HostingPartnerProps {
  language?: "en" | "ar";
}

export default function HostingPartner({ language = "en" }: HostingPartnerProps) {
  const isArabic = language === "ar";

  return (
    <aside className="bg-[var(--navy)] border-t border-white/10 pt-6 pb-28 md:pb-24">  {/* The site keeps a fixed bar at the bottom edge; the padding keeps this clear of it. */}
      <div className="container">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-center sm:flex-row sm:text-start">
          <img
            src="/partners/phantomvps.svg"
            alt="PhantomVPS"
            width={36}
            height={36}
            loading="lazy"
            className="shrink-0 rounded-lg"
          />
          <p className="text-sm leading-relaxed text-white/70">
            <span className="text-white/45">{isArabic ? "الاستضافة من " : "Servers by "}</span>
            <a
              href="https://phantomvps.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              PhantomVPS
            </a>
            <span className="mx-2 text-white/25">·</span>
            {isArabic
              ? "أجهزة NVMe وبير ميتال، تسليم سريع وأداء ثابت. سيرفراتنا عندهم ونرشّحها لمن يحتاج سيرفر."
              : "NVMe and bare-metal servers, quick to set up and steady under load. We run our own systems on them and recommend them."}
          </p>
          <a
            href={isArabic ? "/ar/articles/vps-hosting-voip-pbx-servers" : "/articles/vps-hosting-voip-pbx-servers"}
            className="shrink-0 rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:ms-auto"
          >
            {isArabic ? "اقرأ المقال" : "Read why"}
          </a>
        </div>
      </div>
    </aside>
  );
}
