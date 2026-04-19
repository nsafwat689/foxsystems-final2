import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "wouter";
import Header from "@/components/Header";
import { ArrowRight, Calendar, User, MessageCircle, Share2, ArrowLeft } from "lucide-react";
import { generateArticleSchema } from "@/utils/seo";
interface ArticleDetailProps {
  articleId: string;
  language: "en" | "ar";
}

// Simple markdown to HTML converter
function markdownToHtml(markdown: string): string {
  let html = markdown
    .replace(/^## (.+)$/gm, '<h2 class="text-3xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-2xl font-semibold mt-6 mb-3">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  const lines = html.split('\n');
  const result: string[] = [];
  let inParagraph = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      if (inParagraph) {
        result.push('</p>');
        inParagraph = false;
      }
    } else if (line.startsWith('<h')) {
      if (inParagraph) {
        result.push('</p>');
        inParagraph = false;
      }
      result.push(line);
    } else {
      if (!inParagraph) {
        result.push('<p class="mb-4">');
        inParagraph = true;
      } else {
        result.push(' ');
      }
      result.push(line);
    }
  }
  if (inParagraph) result.push('</p>');
  return result.join('');
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

        <h2>الخلاصة</h2>
        <p>2026 ليس مجرد عام آخر؛ إنه نقطة تحول للنضج الرقمي. بالنسبة للشركات الصغيرة والمتوسطة، لم يعد Odoo ERP ترقية اختيارية - إنه الأساس للبقاء والنمو. دع فوكس سيستمز تساعدك في إطلاق العنان للإمكانيات الكاملة لعملك بحل ينمو معك.</p>
      `,
    }
  },
  "cybersecurity-distributed-workforce-2026": {
    en: {
      id: "cybersecurity-distributed-workforce-2026",
      title: "Cybersecurity in 2026: Protecting the Distributed Workforce",
      subtitle: "Essential strategies for borderless security",
      author: "Fox Systems Team",
      date: "2026-04-05",
      category: "Security",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop",
      content: `
        <h2>The New Security Perimeter</h2>
        <p>The traditional "castle and moat" approach to cybersecurity is officially dead. In 2026, the perimeter is wherever your employees are—at home, in a cafe, or traveling between branches. This distributed workforce requires a Zero Trust architecture that verifies every request, regardless of its origin.</p>

        <h2>Key Strategies for 2026</h2>
        <h3>1. Identity as the New Perimeter</h3>
        <p>In 2026, we focus on securing identities rather than just devices. Multi-factor authentication (MFA) has evolved into continuous biometric verification, ensuring that the person accessing sensitive data is who they say they are throughout their entire session.</p>

        <h3>2. AI-Powered Threat Hunting</h3>
        <p>Hackers are using AI to launch more sophisticated attacks. To counter this, businesses must use AI-powered security tools that can detect anomalies in real-time. These tools can identify the "footprints" of a breach long before it causes damage.</p>

        <h2>Conclusion</h2>
        <p>Cybersecurity is not a one-time setup; it's a continuous process of adaptation. By focusing on identity and leveraging AI, businesses can protect their distributed workforce and maintain trust in a digital-first world. Fox Systems provides the tools and expertise to keep your business secure in 2026 and beyond.</p>
      `,
    },
    ar: {
      id: "cybersecurity-distributed-workforce-2026",
      title: "الأمن السيبراني في عام 2026: حماية القوى العاملة الموزعة",
      subtitle: "استراتيجيات أساسية للأمن بلا حدود",
      author: "فريق فوكس سيستمز",
      date: "2026-04-05",
      category: "الأمن",
      readTime: "10 دقائق قراءة",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop",
      content: `
        <h2>محيط الأمان الجديد</h2>
        <p>لقد انتهى نهج "القلعة والخندق" التقليدي للأمن السيبراني رسمياً. في عام 2026، أصبح المحيط هو المكان الذي يتواجد فيه موظفوك - في المنزل، أو في المقهى، أو أثناء التنقل بين الفروع. تتطلب هذه القوى العاملة الموزعة بنية "ثقة معدومة" (Zero Trust) تتحقق من كل طلب، بغض النظر عن مصدره.</p>

        <h2>الاستراتيجيات الرئيسية لعام 2026</h2>
        <h3>1. الهوية هي المحيط الجديد</h3>
        <p>في عام 2026، نركز على تأمين الهويات بدلاً من مجرد الأجهزة. لقد تطورت المصادقة متعددة العوامل (MFA) إلى تحقق حيوي مستمر، مما يضمن أن الشخص الذي يصل إلى البيانات الحساسة هو من يدعي أنه هو طوال جلسته بالكامل.</p>

        <h3>2. صيد التهديدات المدعوم بالذكاء الاصطناعي</h3>
        <p>يستخدم المتسللون الذكاء الاصطناعي لشن هجمات أكثر تطوراً. لمواجهة ذلك، يجب على الشركات استخدام أدوات أمنية مدعومة بالذكاء الاصطناعي يمكنها اكتشاف الشذوذ في الوقت الفعلي. يمكن لهذه الأدوات تحديد "بصمات" الاختراق قبل وقت طويل من تسببه في ضرر.</p>

        <h2>الخلاصة</h2>
        <p>الأمن السيبراني ليس إعداداً لمرة واحدة؛ إنه عملية مستمرة من التكيف. من خلال التركيز على الهوية والاستفادة من الذكاء الاصطناعي، يمكن للشركات حماية قواها العاملة الموزعة والحفاظ على الثقة في عالم رقمي أولاً. توفر فوكس سيستمز الأدوات والخبرة اللازمة للحفاظ على أمان عملك في عام 2026 وما بعده.</p>
      `,
    }
  }
};

export default function ArticleDetail({ articleId, language }: ArticleDetailProps) {
  const { theme } = useTheme();
  const article = articleContent[articleId];
  const isArabic = language === "ar";
  const langPrefix = isArabic ? "/ar" : "";

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link href={`${langPrefix}/articles`}>
            <Button>Back to Articles</Button>
          </Link>
        </div>
      </div>
    );
  }

  const content = article[language];
  const articleSchema = generateArticleSchema(content, `https://foxsystemstech.com${langPrefix}/articles/${articleId}`);

  return (
    <>
      <div className={`min-h-screen bg-background text-foreground transition-colors ${isArabic ? "rtl" : "ltr"}`}>
        <Header language={language} />

        <main className="container py-20">
          <div className="mb-12">
            <Link href={`${langPrefix}/articles`}>
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                {language === "en" ? "Back to Articles" : "العودة للمقالات"}
              </Button>
            </Link>
          </div>

          <article className="max-w-3xl mx-auto">
            {/* Article header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-primary uppercase">
                  {content.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {content.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border pb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{content.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{content.date}</span>
                </div>
                <span>{content.readTime}</span>
              </div>
            </header>

            {/* Featured image */}
            <img
              src={content.image}
              alt={content.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />

            {/* Article content */}
            <div className="prose prose-lg max-w-none mb-12 dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: content.content }} />
            </div>

            {/* Share buttons */}
            <div className="flex items-center gap-4 py-8 border-t border-border">
              <span className="text-sm font-bold">{language === "en" ? "Share this article:" : "شارك هذا المقال:"}</span>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                {language === "en" ? "Share" : "شارك"}
              </Button>
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-muted rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">
                {language === "en" ? "Need IT Solutions?" : "هل تحتاج إلى حلول تقنية؟"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {language === "en"
                  ? "Contact our team to discuss how we can help your business."
                  : "اتصل بفريقنا لمناقشة كيفية مساعدتك في عملك."}
              </p>
              <Link href={`${langPrefix}/contact`}>
                <Button size="lg">
                  {language === "en" ? "Get in Touch" : "تواصل معنا"}
                </Button>
              </Link>
            </div>
          </article>
        </main>

        {/* Footer */}
        <footer className="bg-foreground/5 border-t border-border py-8 mt-12">
          <div className="container">
            <div className="text-center text-sm text-muted-foreground">
              <p>© 2024 Fox Systems. {language === "en" ? "All rights reserved." : "جميع الحقوق محفوظة."}</p>
            </div>
          </div>
        </footer>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchema }} />
    </>
  );
}
