import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "wouter";
import Header from "@/components/Header";
import { ArrowRight, Calendar, User, MessageCircle, Share2 } from "lucide-react";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { generateArticleSchema } from "@/utils/seo";

interface ArticleDetailProps {
  articleId: string;
}

const articleContent: Record<string, any> = {
  "ai-infrastructure-2026": {
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
  "odoo-erp-sme-2026": {
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
  "cybersecurity-distributed-workforce-2026": {
    title: "Cybersecurity in 2026: Protecting the Distributed Workforce",
    subtitle: "Secure your business in a borderless world",
    author: "Fox Systems Team",
    date: "2026-04-05",
    category: "Cybersecurity",
    readTime: "14 min read",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop",
    content: `
      <h2>The Death of the Traditional Perimeter</h2>
      <p>Remember when "securing the office" meant putting up a strong firewall and making sure the doors were locked? Those days are long gone. In 2026, the "office" is wherever your employees happen to be—a home office in Maadi, a co-working space in Dubai, or a cafe in Alexandria.</p>
      <p>This distributed workforce has created a massive "attack surface" for cybercriminals. At Fox Systems, we've seen a shift in how successful companies approach security: they've moved from "Trust but Verify" to "Never Trust, Always Verify."</p>

      <h2>The Zero Trust Architecture</h2>
      <p>The cornerstone of cybersecurity in 2026 is <strong>Zero Trust</strong>. This framework assumes that threats could be anywhere—even inside your network. Every user, device, and application must be continuously authenticated and authorized.</p>
      <h3>Key Components of a 2026 Security Strategy:</h3>
      <h3>1. Identity as the New Perimeter</h3>
      <p>Since physical locations no longer matter, identity is the only thing that can be consistently managed. Multi-Factor Authentication (MFA) is now the bare minimum. Advanced organizations are moving toward "Passwordless" authentication using biometrics and hardware keys, which are much harder to compromise.</p>
      <h3>2. Endpoint Detection and Response (EDR)</h3>
      <p>Every laptop, tablet, and smartphone used for work is an "endpoint." In 2026, simple antivirus software is insufficient. EDR solutions use AI to monitor device behavior in real-time, automatically isolating any device that starts acting suspiciously—such as attempting to encrypt files or connect to known malicious servers.</p>
      <h3>3. Secure Access Service Edge (SASE)</h3>
      <p>SASE (pronounced "sassy") combines network security functions with wide-area networking (WAN) capabilities. It allows remote workers to connect securely to cloud applications without the latency issues of traditional VPNs. It's the "gold standard" for performance and security in a hybrid work environment.</p>

      <h2>The Human Element: Security Culture</h2>
      <p>Technology is only half the battle. In 2026, the most common entry point for hackers is still human error—phishing, social engineering, or weak passwords.</p>
      <p>Fox Systems recommends a continuous approach to security awareness:</p>
      <ul>
        <li><strong>Simulated Phishing Attacks:</strong> Testing employees' ability to spot suspicious emails.</li>
        <li><strong>Regular Training Modules:</strong> Keeping the team updated on the latest threat vectors.</li>
        <li><strong>Clear Incident Reporting:</strong> Making it easy for employees to report potential issues without fear of punishment.</li>
      </ul>

      <h2>Why Proactive Protection is Non-Negotiable</h2>
      <p>The cost of a data breach in 2026 is higher than ever, not just in terms of direct financial loss, but in the devastating blow to customer trust. For businesses in the Middle East, where digital transformation is accelerating, a single security incident can set back years of progress.</p>

      <h2>Conclusion</h2>
      <p>Cybersecurity is not a "set it and forget it" project; it's a continuous process of adaptation. As the distributed workforce continues to evolve, so must our defenses. Fox Systems is here to provide the advanced tools and strategic guidance needed to keep your business secure in an increasingly borderless world.</p>
    `,
  },
  "voip-basics": {
    id: "voip-basics",
    title: "Understanding VoIP Technology: The Complete Guide",
    subtitle: "Master the fundamentals of Voice over Internet Protocol",
    author: "Fox Systems Team",
    date: "2025-01-15",
    category: "VoIP",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    content: `
      <h2>What is VoIP?</h2>
      <p>Voice over Internet Protocol (VoIP) is a revolutionary technology that enables voice communication and multimedia sessions over Internet Protocol (IP) networks. Unlike traditional phone systems that rely on circuit-switched networks, VoIP converts voice signals into digital packets and transmits them over the internet.</p>

      <h2>How VoIP Works</h2>
      <p>VoIP technology operates through a sophisticated process. When you speak into a VoIP phone or microphone, your voice is converted into digital data packets. These packets are then transmitted over the internet to the recipient's device, where they are converted back into audio. This process happens in real-time, enabling seamless conversations.</p>

      <h3>Key Components of VoIP:</h3>
      <ul>
        <li><strong>VoIP Phone:</strong> Can be a hardware phone or software application</li>
        <li><strong>VoIP Service Provider:</strong> Manages the call routing and connectivity</li>
        <li><strong>Internet Connection:</strong> Required for transmitting voice data</li>
        <li><strong>Codec:</strong> Compresses and decompresses voice data</li>
      </ul>

      <h2>Advantages of VoIP</h2>
      <p>VoIP offers numerous benefits for businesses and individuals:</p>
      <ul>
        <li><strong>Cost Savings:</strong> Significantly lower costs compared to traditional phone systems</li>
        <li><strong>Flexibility:</strong> Make calls from anywhere with an internet connection</li>
        <li><strong>Scalability:</strong> Easy to add or remove users as your business grows</li>
        <li><strong>Advanced Features:</strong> Call forwarding, voicemail, call recording, and more</li>
        <li><strong>Integration:</strong> Seamlessly integrates with business applications</li>
      </ul>

      <h2>VoIP vs Traditional Phone Systems</h2>
      <p>Traditional phone systems use dedicated phone lines and circuit-switched networks, while VoIP uses the internet. This fundamental difference results in:</p>
      <ul>
        <li>Lower infrastructure costs</li>
        <li>Greater flexibility and mobility</li>
        <li>Better scalability</li>
        <li>Advanced communication features</li>
      </ul>

      <h2>Conclusion</h2>
      <p>VoIP technology has transformed business communication, offering cost-effective, flexible, and feature-rich solutions. Whether you're a small startup or a large enterprise, VoIP can significantly improve your communication infrastructure.</p>
    `,
  },
  "pbx-systems": {
    id: "pbx-systems",
    title: "Private Branch Exchange (PBX) Systems Explained",
    subtitle: "Optimize your internal communication infrastructure",
    author: "Fox Systems Team",
    date: "2025-01-12",
    category: "PBX",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    content: `
      <h2>Understanding PBX Systems</h2>
      <p>A Private Branch Exchange (PBX) is a telephone system within an organization that switches calls between users on local lines while allowing all users to share a certain number of external phone lines. PBX systems are essential for managing internal and external communications efficiently.</p>

      <h2>Traditional vs Modern PBX</h2>
      <p>Traditional PBX systems were hardware-based and required significant physical infrastructure. Modern PBX systems, particularly IP PBX (Internet Protocol PBX), operate over data networks and offer greater flexibility and scalability.</p>

      <h3>Key Differences:</h3>
      <ul>
        <li><strong>Traditional PBX:</strong> Hardware-based, circuit-switched, limited features</li>
        <li><strong>IP PBX:</strong> Software-based, packet-switched, advanced features</li>
      </ul>

      <h2>Benefits of PBX Systems</h2>
      <ul>
        <li><strong>Cost Efficiency:</strong> Reduce external line requirements and costs</li>
        <li><strong>Internal Communication:</strong> Seamless communication between employees</li>
        <li><strong>Professional Image:</strong> Advanced call routing and auto-attendant features</li>
        <li><strong>Scalability:</strong> Easy to add extensions as your organization grows</li>
        <li><strong>Advanced Features:</strong> Call forwarding, voicemail, call recording, and conferencing</li>
      </ul>

      <h2>PBX Features</h2>
      <p>Modern PBX systems offer a wide range of features:</p>
      <ul>
        <li>Automatic Call Distribution (ACD)</li>
        <li>Interactive Voice Response (IVR)</li>
        <li>Call Recording and Monitoring</li>
        <li>Voicemail and Email Integration</li>
        <li>Conference Bridging</li>
        <li>Call Forwarding and Transfer</li>
      </ul>

      <h2>Choosing the Right PBX System</h2>
      <p>When selecting a PBX system, consider your organization's size, budget, and communication needs. IP PBX systems are increasingly popular due to their flexibility, scalability, and integration capabilities with modern business applications.</p>

      <h2>Conclusion</h2>
      <p>PBX systems remain a cornerstone of business communication infrastructure. Whether you choose a traditional or IP-based solution, a well-implemented PBX system can significantly improve your organization's communication efficiency.</p>
    `,
  },
  "asterisk-server": {
    id: "asterisk-server",
    title: "Asterisk Server: Building Powerful Communication Systems",
    subtitle: "Leverage open-source telecommunications technology",
    author: "Fox Systems Team",
    date: "2025-01-10",
    category: "Asterisk",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    content: `
      <h2>What is Asterisk?</h2>
      <p>Asterisk is an open-source framework for building communications applications. It provides the core infrastructure for VoIP and PBX systems, allowing organizations to build custom telecommunications solutions tailored to their specific needs.</p>

      <h2>Key Features of Asterisk</h2>
      <ul>
        <li><strong>Open Source:</strong> Free and customizable</li>
        <li><strong>Cross-Platform:</strong> Runs on Linux, Windows, and Mac</li>
        <li><strong>VoIP Support:</strong> Supports multiple VoIP protocols</li>
        <li><strong>PBX Functionality:</strong> Full-featured PBX capabilities</li>
        <li><strong>IVR:</strong> Interactive Voice Response systems</li>
        <li><strong>Call Recording:</strong> Built-in call recording capabilities</li>
      </ul>

      <h2>Asterisk Architecture</h2>
      <p>Asterisk operates as a modular system with several key components:</p>
      <ul>
        <li><strong>Core:</strong> Handles call routing and switching</li>
        <li><strong>Channels:</strong> Interface with different communication protocols</li>
        <li><strong>Applications:</strong> Provide PBX functionality</li>
        <li><strong>Codecs:</strong> Handle voice compression and decompression</li>
      </ul>

      <h2>Asterisk Applications</h2>
      <p>Asterisk can be used for various telecommunications applications:</p>
      <ul>
        <li>IP PBX systems for businesses</li>
        <li>Call centers and contact centers</li>
        <li>IVR and auto-attendant systems</li>
        <li>VoIP gateways</li>
        <li>Conference bridges</li>
        <li>Custom telecommunications applications</li>
      </ul>

      <h2>Advantages of Asterisk</h2>
      <ul>
        <li><strong>Cost-Effective:</strong> Open source and free</li>
        <li><strong>Flexible:</strong> Highly customizable for specific needs</li>
        <li><strong>Scalable:</strong> Can handle small to large deployments</li>
        <li><strong>Community Support:</strong> Large and active community</li>
        <li><strong>Integration:</strong> Integrates with various business applications</li>
      </ul>

      <h2>Getting Started with Asterisk</h2>
      <p>Implementing Asterisk requires technical expertise. Consider working with experienced telecommunications professionals to ensure proper deployment and configuration for your organization's needs.</p>

      <h2>Conclusion</h2>
      <p>Asterisk provides a powerful, flexible, and cost-effective platform for building telecommunications systems. Whether you're building a small office PBX or a large-scale call center, Asterisk offers the tools and flexibility needed for success.</p>
    `,
  },
  "telecom-trends": {
    id: "telecom-trends",
    title: "2025 Telecommunications Trends: What's Next?",
    subtitle: "Stay ahead with emerging telecommunications technologies",
    author: "Fox Systems Team",
    date: "2025-01-08",
    category: "Telecommunications",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    content: `
      <h2>The Evolution of Telecommunications</h2>
      <p>Telecommunications continues to evolve rapidly, driven by technological advancements and changing business needs. Understanding emerging trends helps organizations stay competitive and make informed decisions about their communication infrastructure.</p>

      <h2>Top Telecommunications Trends for 2025</h2>

      <h3>1. Cloud-Based Communications</h3>
      <p>Cloud-based communication systems continue to gain adoption due to their flexibility, scalability, and cost-effectiveness. Organizations are increasingly migrating from on-premises systems to cloud-based solutions.</p>

      <h3>2. AI-Powered Customer Service</h3>
      <p>Artificial Intelligence is transforming customer service with intelligent chatbots, sentiment analysis, and predictive routing. AI-powered systems improve efficiency and customer satisfaction.</p>

      <h3>3. Unified Communications</h3>
      <p>Unified Communications platforms integrate voice, video, messaging, and collaboration tools into a single platform, enabling seamless communication across channels.</p>

      <h3>4. 5G Integration</h3>
      <p>5G technology enables faster, more reliable mobile communications, opening new possibilities for mobile-first business applications.</p>

      <h3>5. Security and Compliance</h3>
      <p>With increasing cyber threats, security and compliance remain top priorities. End-to-end encryption and compliance with regulations like GDPR are essential.</p>

      <h2>Conclusion</h2>
      <p>The telecommunications landscape continues to evolve rapidly. By staying informed about emerging trends and making strategic investments, organizations can leverage new technologies to improve communication, enhance productivity, and drive business growth.</p>
    `,
  },
  "voip-security": {
    id: "voip-security",
    title: "VoIP Security: Protecting Your Communications",
    subtitle: "Essential security measures for VoIP infrastructure",
    author: "Fox Systems Team",
    date: "2025-01-05",
    category: "VoIP",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    content: `
      <h2>VoIP Security Challenges</h2>
      <p>While VoIP offers numerous benefits, it also introduces security challenges. Voice communications transmitted over the internet are vulnerable to various threats including eavesdropping, call hijacking, and denial-of-service attacks.</p>

      <h2>Common VoIP Security Threats</h2>
      <ul>
        <li><strong>Eavesdropping:</strong> Unauthorized interception of voice communications</li>
        <li><strong>Call Hijacking:</strong> Unauthorized access to active calls</li>
        <li><strong>Denial of Service:</strong> Attacks that disrupt VoIP service</li>
        <li><strong>Phishing:</strong> Social engineering attacks targeting VoIP users</li>
        <li><strong>Malware:</strong> Malicious software targeting VoIP devices</li>
      </ul>

      <h2>VoIP Security Best Practices</h2>

      <h3>1. Encryption</h3>
      <p>Implement end-to-end encryption for all voice communications. Use secure protocols like SRTP (Secure Real-time Transport Protocol) and TLS (Transport Layer Security).</p>

      <h3>2. Firewalls and Access Control</h3>
      <p>Deploy firewalls specifically configured for VoIP traffic. Implement strict access control policies to limit who can access your VoIP system.</p>

      <h3>3. Regular Updates and Patches</h3>
      <p>Keep all VoIP equipment and software updated with the latest security patches. Regularly review and update security configurations.</p>

      <h3>4. Strong Authentication</h3>
      <p>Implement strong authentication mechanisms including multi-factor authentication for VoIP system access.</p>

      <h3>5. Network Segmentation</h3>
      <p>Separate VoIP traffic from general data traffic using VLANs (Virtual Local Area Networks) to limit the impact of potential breaches.</p>

      <h2>Conclusion</h2>
      <p>VoIP security is critical for protecting sensitive communications and maintaining business continuity. By implementing comprehensive security measures and staying informed about emerging threats, organizations can safely leverage the benefits of VoIP technology.</p>
    `,
  },
};

const translations = {
  en: {
    home: "Home",
    articles: "Articles",
    readTime: "min read",
    author: "By",
    published: "Published",
    share: "Share",
    contact: "Contact Us",
    relatedArticles: "Related Articles",
    backToArticles: "Back to Articles",
    whatsapp: "WhatsApp Us",
  },
  ar: {
    home: "الرئيسية",
    articles: "المقالات",
    readTime: "دقيقة قراءة",
    author: "بواسطة",
    published: "نُشر في",
    share: "شارك",
    contact: "تواصل معنا",
    relatedArticles: "مقالات ذات صلة",
    backToArticles: "العودة إلى المقالات",
    whatsapp: "واتس آب",
  },
};

interface ArticleDetailProps {
  articleId: string;
  language: "en" | "ar";
  setLanguage: (lang: "en" | "ar") => void;
}

export default function ArticleDetail({ articleId, language, setLanguage }: ArticleDetailProps) {
  const isArabic = language === "ar";
  const t = translations[language];

  const article = articleContent[articleId] || articleContent["voip-basics"];

  const whatsappNumber = "201557649136";
  const whatsappMessage = `Hi, I'm interested in learning more about your services. I read your article: "${article.title}"`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "en" ? "en-US" : "ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const seoConfig = {
    title: `${article.title} | Fox Systems`,
    description: article.subtitle,
    canonicalUrl: `https://foxsystemstech.com/${language === "ar" ? "ar/" : ""}articles/${article.id}`,
    ogImage: article.image,
    ogType: "article" as const,
  };

  const articleSchema = generateArticleSchema({
    title: article.title,
    description: article.subtitle,
    image: article.image,
    author: article.author,
    datePublished: article.date,
    url: seoConfig.canonicalUrl,
  });

  return (
    <>
      <SEOHead
        config={seoConfig}
        additionalSchema={articleSchema}
      />
      <div className={`min-h-screen bg-background text-foreground transition-colors ${isArabic ? "rtl" : "ltr"}`}>
        <Header language={language} setLanguage={setLanguage} />

        {/* Article Header */}
        <section className="bg-gradient-to-br from-primary/10 via-transparent to-primary/5 py-12 md:py-16">
          <div className="container">
            <Link href="/articles" className="text-primary hover:underline text-sm mb-4 inline-block">
              ← {t.backToArticles}
            </Link>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <span className="text-sm text-muted-foreground">{article.readTime}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">{article.title}</h1>
              <p className="text-xl text-muted-foreground">{article.subtitle}</p>
              <div className={`flex flex-wrap gap-4 text-sm text-muted-foreground ${isArabic ? "flex-row-reverse" : ""}`}>
                <span>{t.author} {article.author}</span>
                <span>{t.published} {formatDate(article.date)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8">
          <div className="container">
            <img src={article.image} alt={article.title} className="w-full h-96 object-cover rounded-lg" />
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="md:col-span-2">
                <div
                  className="prose prose-sm md:prose-base dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Card */}
                <Card className="border-2 border-primary/30 sticky top-24">
                  <CardHeader>
                    <h3 className="text-xl font-bold">{isArabic ? "هل أنت مهتم؟" : "Interested?"}</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {isArabic
                        ? "تواصل معنا لمعرفة المزيد عن خدماتنا والحلول المتاحة."
                        : "Contact us to learn more about our services and solutions."}
                    </p>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full" size="sm">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {t.whatsapp}
                      </Button>
                    </a>
                  </CardContent>
                </Card>

                {/* Share Card */}
                <Card>
                  <CardHeader>
                    <h3 className="font-bold flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      {t.share}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <button className="w-full text-left text-sm text-primary hover:underline">
                        {isArabic ? "شارك على فيسبوك" : "Share on Facebook"}
                      </button>
                      <button className="w-full text-left text-sm text-primary hover:underline">
                        {isArabic ? "شارك على تويتر" : "Share on Twitter"}
                      </button>
                      <button className="w-full text-left text-sm text-primary hover:underline">
                        {isArabic ? "نسخ الرابط" : "Copy Link"}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
