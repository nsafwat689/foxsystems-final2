import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import Header from "@/components/Header";
import { ArrowRight, Calendar, User, MessageCircle, Share2 } from "lucide-react";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { generateArticleSchema, arabicSEOConfigs, serviceSEOConfigs } from "@/utils/seo";

interface ArticleDetailProps {
  articleId: string;
  language: "en" | "ar";
  setLanguage: (lang: "en" | "ar") => void;
}

const articleContent: Record<string, Record<"en" | "ar", any>> = {
  "ai-infrastructure-2026": {
    en: {
      id: "ai-infrastructure-2026",
      title: "The Future of Enterprise IT Infrastructure in 2026: AI-Native Foundations",
      subtitle: "Build a resilient foundation for the AI era",
      author: "Fox Systems Team",
      date: "2026-04-10",
      category: "Infrastructure",
      readTime: "15 min read",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
      content: `
        <h2>The Paradigm Shift to AI-Native Infrastructure</h2>
        <p>In 2026, the landscape of enterprise IT has undergone a fundamental transformation. We have moved beyond simply "using AI" to building "AI-native" foundations. This means that the underlying infrastructure—servers, networks, and storage—is designed from the ground up to support the massive data processing and real-time inference requirements of modern artificial intelligence.</p>
        <p>For businesses in Egypt and the Middle East, this shift represents a unique opportunity to leapfrog legacy systems. At Fox Systems, we are seeing a surge in demand for infrastructure that doesn't just host applications but actively manages them using intelligent automation.</p>

        <h2>Key Pillars of 2026 IT Infrastructure</h2>
        <h3>1. Self-Healing Networks</h3>
        <p>Modern networks now utilize predictive analytics to identify potential bottlenecks or hardware failures before they occur. By the time a human administrator would have noticed a slowdown, an AI-native network has already rerouted traffic and initiated a support ticket. This level of resilience is critical for companies operating across multiple branches where downtime translates directly to lost revenue.</p>

        <h3>2. Edge Computing Integration</h3>
        <p>As IoT devices proliferate, processing data at the "edge"—closer to where it's generated—has become essential. Whether it's a manufacturing plant in 6th of October City or a retail chain in Cairo, edge computing reduces latency and bandwidth costs by filtering data locally before sending only the most relevant insights to the central cloud.</p>

        <h3>3. Sustainable Data Centers</h3>
        <p>With global focus on ESG (Environmental, Social, and Governance) goals, 2026 is the year of the "Green Data Center." Modern infrastructure now prioritizes energy efficiency, using AI to optimize cooling systems and power distribution. This not only helps the planet but significantly reduces the operational costs for large-scale enterprises.</p>

        <h2>Why the Foundation Matters</h2>
        <p>Many organizations make the mistake of trying to run advanced AI models on aging hardware. This leads to "technical debt" that can stifle innovation for years. A robust, AI-native foundation ensures that your business can scale rapidly, integrate new technologies seamlessly, and maintain a high level of security.</p>

        <h2>Conclusion</h2>
        <p>The future of IT is not just about faster processors; it's about smarter systems. By investing in AI-native infrastructure today, enterprises are securing their place in the digital economy of tomorrow. Fox Systems is committed to being your partner in this journey, providing the expertise and hardware needed to build a truly resilient foundation.</p>
      `,
    },
    ar: {
      id: "ai-infrastructure-2026",
      title: "مستقبل البنية التحتية لتكنولوجيا المعلومات للمؤسسات في عام 2026: أسس تعتمد على الذكاء الاصطناعي",
      subtitle: "بناء أساس مرن لعصر الذكاء الاصطناعي",
      author: "فريق فوكس سيستمز",
      date: "2026-04-10",
      category: "البنية التحتية",
      readTime: "15 دقيقة قراءة",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
      content: `
        <h2>التحول الجذري نحو البنية التحتية القائمة على الذكاء الاصطناعي</h2>
        <p>في عام 2026، شهد مشهد تكنولوجيا المعلومات للمؤسسات تحولاً جوهرياً. لقد انتقلنا إلى ما هو أبعد من مجرد "استخدام الذكاء الاصطناعي" إلى بناء أسس "قائمة على الذكاء الاصطناعي". وهذا يعني أن البنية التحتية الأساسية - الخوادم والشبكات والتخزين - مصممة من الألف إلى الياء لدعم متطلبات معالجة البيانات الضخمة والاستدلال في الوقت الفعلي للذكاء الاصطناعي الحديث.</p>
        <p>بالنسبة للشركات في مصر والشرق الأوسط، يمثل هذا التحول فرصة فريدة لتجاوز الأنظمة القديمة. في فوكس سيستمز، نشهد طفرة في الطلب على البنية التحتية التي لا تستضيف التطبيقات فحسب، بل تديرها بنشاط باستخدام الأتمتة الذكية.</p>

        <h2>الركائز الأساسية للبنية التحتية لتكنولوجيا المعلومات لعام 2026</h2>
        <h3>1. الشبكات ذاتية الإصلاح</h3>
        <p>تستخدم الشبكات الحديثة الآن التحليلات التنبؤية لتحديد الاختناقات المحتملة أو أعطال الأجهزة قبل حدوثها. بحلول الوقت الذي يلاحظ فيه المسؤول البشري تباطؤاً، تكون الشبكة القائمة على الذكاء الاصطناعي قد قامت بالفعل بإعادة توجيه حركة المرور وبدأت تذكرة دعم. هذا المستوى من المرونة أمر بالغ الأهمية للشركات التي تعمل عبر فروع متعددة حيث يترجم وقت التوقف مباشرة إلى خسارة في الإيرادات.</p>

        <h3>2. تكامل الحوسبة الحافية (Edge Computing)</h3>
        <p>مع انتشار أجهزة إنترنت الأشياء، أصبح معالجة البيانات عند "الحافة" - بالقرب من مكان إنتاجها - أمراً ضرورياً. سواء كان مصنعاً في مدينة السادس من أكتوبر أو سلسلة متاجر في القاهرة، فإن الحوسبة الحافية تقلل من زمن الوصول وتكاليف النطاق الترددي عن طريق تصفية البيانات محلياً قبل إرسال الرؤى الأكثر صلة فقط إلى السحابة المركزية.</p>

        <h3>3. مراكز البيانات المستدامة</h3>
        <p>مع التركيز العالمي على الأهداف البيئية والاجتماعية وحوكمة الشركات (ESG)، فإن عام 2026 هو عام "مركز البيانات الأخضر". تعطي البنية التحتية الحديثة الآن الأولوية لكفاءة الطاقة، باستخدام الذكاء الاصطناعي لتحسين أنظمة التبريد وتوزيع الطاقة. هذا لا يساعد الكوكب فحسب، بل يقلل بشكل كبير من التكاليف التشغيلية للمؤسسات الكبيرة.</p>

        <h2>لماذا يهم الأساس</h2>
        <p>ترتكب العديد من المؤسسات خطأ محاولة تشغيل نماذج ذكاء اصطناعي متقدمة على أجهزة قديمة. يؤدي هذا إلى "دين تقني" يمكن أن يخنق الابتكار لسنوات. يضمن الأساس القوي القائم على الذكاء الاصطناعي أن عملك يمكن أن يتوسع بسرعة، ويدمج التقنيات الجديدة بسلاسة، ويحافظ على مستوى عالٍ من الأمان.</p>

        <h2>الخلاصة</h2>
        <p>مستقبل تكنولوجيا المعلومات لا يتعلق فقط بمعالجات أسرع؛ بل يتعلق بأنظمة أذكى. من خلال الاستثمار في البنية التحتية القائمة على الذكاء الاصطناعي اليوم، تضمن المؤسسات مكانها في الاقتصاد الرقمي للغد. تلتزم فوكس سيستمز بأن تكون شريكك في هذه الرحلة، حيث توفر الخبرة والأجهزة اللازمة لبناء أساس مرن حقاً.</p>
      `,
    }
  },
  "odoo-erp-sme-2026": {
    en: {
      id: "odoo-erp-sme-2026",
      title: "Why 2026 is the Definitive Year for SMEs to Adopt Odoo ERP",
      subtitle: "Unlock your business potential with modular ERP",
      author: "Fox Systems Team",
      date: "2026-04-08",
      category: "Software",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
      content: `
        <h2>The SME Challenge in a Digital-First World</h2>
        <p>Small and Medium Enterprises (SMEs) have always faced the challenge of "doing more with less." In 2026, this challenge is amplified by a global market that expects instant responses, personalized service, and seamless digital experiences. To compete, SMEs can no longer rely on fragmented spreadsheets or disconnected software tools. They need a unified "brain" for their business.</p>
        <p>This is where Odoo ERP comes in. As an official Odoo partner, Fox Systems has witnessed firsthand how this modular platform can transform a struggling business into a streamlined powerhouse.</p>

        <h2>The Modular Advantage</h2>
        <p>One of the biggest myths about ERP (Enterprise Resource Planning) systems is that they are only for giant corporations. Odoo shatters this myth with its modular approach. You don't have to implement everything at once.</p>
        <h3>Start Small, Scale Fast</h3>
        <p>An SME might start with just the <strong>Accounting</strong> and <strong>Inventory</strong> modules. As they grow, they can easily add <strong>CRM</strong>, <strong>E-commerce</strong>, <strong>Manufacturing</strong>, or <strong>Human Resources</strong>. This "pay-as-you-grow" model is perfect for the fluctuating budgets of growing businesses in the Middle East.</p>

        <h2>New Features in 2026</h2>
        <p>The 2026 version of Odoo has introduced several game-changing features specifically designed for the modern SME:</p>
        <h3>1. AI-Driven Financial Forecasting</h3>
        <p>Odoo now uses historical data to provide highly accurate cash flow forecasts. For an SME, knowing exactly when a cash crunch might occur allows for proactive management and better decision-making.</p>
        <h3>2. Hyper-Personalized Marketing Automation</h3>
        <p>The CRM and Marketing modules now integrate deep learning to segment customers more effectively than ever. SMEs can now run marketing campaigns that rival the sophistication of global brands, all within a single interface.</p>
        <h3>3. Enhanced Localized Compliance</h3>
        <p>For businesses in Egypt, staying compliant with local tax laws and e-invoicing requirements is a top priority. Odoo's 2026 updates include enhanced localization features that automate much of this compliance work, reducing the risk of errors and penalties.</p>

        <h2>The Fox Systems Implementation Approach</h2>
        <p>At Fox Systems, we don't just "install" software. We partner with you to understand your unique workflows. Our implementation process involves:</p>
        <ul>
          <li><strong>Business Process Audit:</strong> Identifying bottlenecks in your current operations.</li>
          <li><strong>Custom Configuration:</strong> Tailoring Odoo modules to fit your specific needs.</li>
          <li><strong>Team Training:</strong> Ensuring your staff is confident and productive from day one.</li>
          <li><strong>Ongoing Support:</strong> Being there as your business evolves and needs new capabilities.</li>
        </ul>

        <h2>Conclusion</h2>
        <p>2026 is not just another year; it's a turning point for digital maturity. For SMEs, Odoo ERP is no longer an optional upgrade—it's the foundation for survival and growth. Let Fox Systems help you unlock the full potential of your business with a solution that grows with you.</p>
      `,
    },
    ar: {
      id: "odoo-erp-sme-2026",
      title: "لماذا يعد عام 2026 العام الحاسم للشركات الصغيرة والمتوسطة لاعتماد Odoo ERP",
      subtitle: "أطلق العنان لإمكانيات عملك مع نظام ERP المعياري",
      author: "فريق فوكس سيستمز",
      date: "2026-04-08",
      category: "البرمجيات",
      readTime: "12 دقيقة قراءة",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
      content: `
        <h2>تحدي الشركات الصغيرة والمتوسطة في عالم رقمي أولاً</h2>
        <p>لطالما واجهت الشركات الصغيرة والمتوسطة تحدي "فعل المزيد بموارد أقل". في عام 2026، يتضاعف هذا التحدي بسبب سوق عالمي يتوقع استجابة فورية وخدمة شخصية وتجارب رقمية سلسة. للمنافسة، لم يعد بإمكان الشركات الصغيرة والمتوسطة الاعتماد على جداول البيانات المجزأة أو أدوات البرمجيات المنفصلة. إنهم بحاجة إلى "عقل" موحد لأعمالهم.</p>
        <p>هنا يأتي دور Odoo ERP. كشريك رسمي لأودو، شهدت فوكس سيستمز بشكل مباشر كيف يمكن لهذه المنصة المعيارية أن تحول الأعمال المتعثرة إلى قوة دفع انسيابية.</p>

        <h2>الميزة المعيارية</h2>
        <p>أحد أكبر الأساطير حول أنظمة ERP (تخطيط موارد المؤسسات) هي أنها مخصصة فقط للشركات العملاقة. يحطم أودو هذه الأسطورة بنهجه المعياري. ليس عليك تنفيذ كل شيء دفعة واحدة.</p>
        <h3>ابدأ صغيراً، وتوسع بسرعة</h3>
        <p>قد تبدأ الشركة الصغيرة والمتوسطة بوحدات <strong>المحاسبة</strong> و <strong>المخزون</strong> فقط. ومع نموها، يمكنها بسهولة إضافة <strong>إدارة علاقات العملاء (CRM)</strong>، أو <strong>التجارة الإلكترونية</strong>، أو <strong>التصنيع</strong>، أو <strong>الموارد البشرية</strong>. هذا النموذج "ادفع مقابل ما تحتاجه للنمو" مثالي للميزانيات المتقلبة للشركات النامية في الشرق الأوسط.</p>

        <h2>ميزات جديدة في عام 2026</h2>
        <p>قدم إصدار 2026 من أودو العديد من الميزات التي تغير قواعد اللعبة والمصممة خصيصاً للشركات الصغيرة والمتوسطة الحديثة:</p>
        <h3>1. التنبؤ المالي القائم على الذكاء الاصطناعي</h3>
        <p>يستخدم أودو الآن البيانات التاريخية لتقديم توقعات دقيقة للغاية للتدفقات النقدية. بالنسبة للشركة الصغيرة والمتوسطة، فإن معرفة متى قد تحدث أزمة نقدية بالضبط تسمح بالإدارة الاستباقية واتخاذ قرارات أفضل.</p>
        <h3>2. أتمتة التسويق الشخصي للغاية</h3>
        <p>تدمج وحدات CRM والتسويق الآن التعلم العميق لتقسيم العملاء بشكل أكثر فعالية من أي وقت مضى. يمكن للشركات الصغيرة والمتوسطة الآن تشغيل حملات تسويقية تضاهي تطور العلامات التجارية العالمية، كل ذلك ضمن واجهة واحدة.</p>
        <h3>3. تعزيز الامتثال المحلي</h3>
        <p>بالنسبة للشركات في مصر، يمثل البقاء متوافقاً مع قوانين الضرائب المحلية ومتطلبات الفواتير الإلكترونية أولوية قصوى. تتضمن تحديثات أودو لعام 2026 ميزات توطين محسنة تعمل على أتمتة الكثير من أعمال الامتثال هذه، مما يقلل من مخاطر الأخطاء والعقوبات.</p>

        <h2>نهج تنفيذ فوكس سيستمز</h2>
        <p>في فوكس سيستمز، نحن لا نقوم فقط بـ "تثبيت" البرامج. نحن نشاركك لفهم سير عملك الفريد. تتضمن عملية التنفيذ لدينا:</p>
        <ul>
          <li><strong>تدقيق عمليات الأعمال:</strong> تحديد الاختناقات في عملياتك الحالية.</li>
          <li><strong>التكوين المخصص:</strong> تخصيص وحدات أودو لتناسب احتياجاتك الخاصة.</li>
          <li><strong>تدريب الفريق:</strong> ضمان ثقة وإنتاجية موظفيك من اليوم الأول.</li>
          <li><strong>الدعم المستمر:</strong> التواجد معك مع تطور عملك وحاجتك لإمكانيات جديدة.</li>
        </ul>

        <h2>الخلاصة</h2>
        <p>عام 2026 ليس مجرد عام آخر؛ إنه نقطة تحول للنضج الرقمي. بالنسبة للشركات الصغيرة والمتوسطة، لم يعد Odoo ERP ترقية اختيارية - إنه الأساس للبقاء والنمو. دع فوكس سيستمز تساعدك على إطلاق العنان للإمكانيات الكاملة لعملك من خلال حل ينمو معك.</p>
      `,
    }
  }
};

export default function ArticleDetail({ articleId, language, setLanguage }: ArticleDetailProps) {
  const [location] = useLocation();
  const isArabic = language === "ar";

  useEffect(() => {
    // Synchronize language state with the URL
    if (location.startsWith("/ar/") && language !== "ar") {
      setLanguage("ar");
    } else if (!location.startsWith("/ar/") && language === "ar") {
      setLanguage("en");
    }
  }, [location, language, setLanguage]);

  const data = (articleContent[articleId] || articleContent["ai-infrastructure-2026"])[language];

  const seoConfig = isArabic 
    ? {
        ...arabicSEOConfigs.articles,
        title: `${data.title} - Fox Systems`,
        canonicalUrl: `https://foxsystemstech.com/ar/articles/${articleId}`
      }
    : {
        ...serviceSEOConfigs.articles,
        title: `${data.title} - Fox Systems`,
        canonicalUrl: `https://foxsystemstech.com/articles/${articleId}`
      };

  const articleSchema = generateArticleSchema(data, seoConfig.canonicalUrl);

  return (
    <>
      <SEOHead config={seoConfig} organizationSchema={true} additionalSchema={articleSchema} />
      <div className={`min-h-screen bg-background text-foreground transition-colors ${isArabic ? "rtl" : "ltr"}`}>
        <Header language={language} setLanguage={setLanguage} />

        {/* Article Hero */}
        <section className="relative py-20 bg-black overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          </div>
          <div className="container relative z-10">
            <div className={`max-w-4xl mx-auto ${isArabic ? "text-right" : ""}`}>
              <div className="flex items-center gap-3 mb-6 text-primary font-bold uppercase tracking-wider">
                <span className="px-3 py-1 bg-primary/20 rounded-full text-sm">{data.category}</span>
                <span className="text-white/60">•</span>
                <span className="text-white/80 text-sm">{data.readTime}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {data.title}
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
                {data.subtitle}
              </p>
              <div className="flex items-center gap-6 text-white/60">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{data.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{data.date}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <main className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <article 
              className={`prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary ${isArabic ? "text-right" : ""}`}
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            
            <div className="mt-16 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="font-bold">{isArabic ? "مشاركة المقال:" : "Share this article:"}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Link href={`/${isArabic ? "ar/" : ""}articles`}>
                <Button variant="ghost" className="gap-2">
                  <ArrowRight className={`w-4 h-4 ${isArabic ? "" : "rotate-180"}`} />
                  {isArabic ? "العودة إلى المقالات" : "Back to Articles"}
                </Button>
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-foreground/5 border-t border-border py-12 mt-12">
          <div className="container text-center">
            <div className="mb-8">
              <img src="/logo.jpg" alt="Fox Systems" className="h-12 w-12 rounded-lg mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Fox Systems</h2>
              <p className="text-muted-foreground mt-2">{isArabic ? "شريكك التقني الموثوق في مصر والشرق الأوسط" : "Your Trusted IT Partner in Egypt & Middle East"}</p>
            </div>
            <div className="text-sm text-muted-foreground pt-8 border-t border-border/50">
              <p>© 2024 Fox Systems. {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
