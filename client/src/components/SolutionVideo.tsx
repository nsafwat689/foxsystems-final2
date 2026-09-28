/**
 * The narrated product tour for a CRM page, in the page's language.
 * Files: /videos/<base>-<en|ar>.mp4 with a .jpg poster beside it. preload="none"
 * so the page pays nothing until the visitor presses play.
 */
import { PlayCircle } from "lucide-react";

export type SolutionVideoInfo = { base: string; minutes: number };

export function videoSrc(v: SolutionVideoInfo, language: "en" | "ar") {
  return { mp4: `/videos/${v.base}-${language}.mp4`, poster: `/videos/${v.base}-${language}.jpg` };
}

/** schema.org VideoObject, so the tour can show up in video results. */
export function videoSchema(v: SolutionVideoInfo, language: "en" | "ar", name: string, description: string) {
  const origin = "https://foxsystemstech.com";
  const { mp4, poster } = videoSrc(v, language);
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: `${origin}${poster}`,
    contentUrl: `${origin}${mp4}`,
    uploadDate: "2026-09-28",
    duration: `PT${v.minutes}M`,
    inLanguage: language,
  };
}

export default function SolutionVideo({ video, language, productName }: {
  video: SolutionVideoInfo; language: "en" | "ar"; productName: string;
}) {
  const isArabic = language === "ar";
  const { mp4, poster } = videoSrc(video, language);
  return (
    <section id="video-tour" className="mb-16 pb-14 border-b border-border scroll-mt-28">
      <div className="flex flex-col gap-3 mb-7">
        <h2 className="text-2xl md:text-3xl font-extrabold flex items-center gap-3" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          <PlayCircle className="w-7 h-7 text-primary shrink-0" aria-hidden="true" />
          {isArabic ? `جولة بالفيديو في ${productName}` : `Video tour: ${productName}`}
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          {isArabic
            ? `نحو ${video.minutes} دقائق على النظام الحقيقي، شاشةً بعد شاشة، مع شرح مكتوب لكل خطوة.`
            : `About ${video.minutes} minutes on the real system, screen by screen, with a written explanation of every step.`}
        </p>
      </div>
      <div className="rounded-2xl overflow-hidden border border-border bg-black shadow-xl max-w-5xl">
        <video controls preload="none" playsInline poster={poster} className="w-full aspect-video block"
          aria-label={isArabic ? `جولة بالفيديو في ${productName}` : `Video tour of ${productName}`}>
          <source src={mp4} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
