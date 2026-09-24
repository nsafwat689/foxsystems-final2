import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { lazy, Suspense, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { SOLUTION_IDS } from "./data/solutionIds";

// Only the home page ships in the entry bundle. Everything else loads on
// demand — carrying all eleven pages up front put ~900 kB of JavaScript in
// front of the first paint.
const Industries = lazy(() => import("./pages/Industries"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const LeadMagnet = lazy(() => import("./pages/LeadMagnet"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Articles = lazy(() => import("./pages/Articles"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));
const Solutions = lazy(() => import("./pages/Solutions"));
const SolutionDetail = lazy(() => import("./pages/SolutionDetail"));

const SERVICE_IDS = [
  "internet",
  "crm",
  "hardware",
  "cybersecurity",
  "infrastructure",
  "web-development",
] as const;

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

/** One route table, rendered once per language; "" is English, "/ar" is Arabic. */
function localeRoutes(language: "en" | "ar") {
  const prefix = language === "ar" ? "/ar" : "";
  const home = language === "ar" ? "/ar" : "/";

  return [
    <Route key={`${language}-home`} path={home}>{() => <Home language={language} />}</Route>,
    // /about has no page of its own; it renders the home page.
    <Route key={`${language}-about`} path={`${prefix}/about`}>{() => <Home language={language} />}</Route>,
    <Route key={`${language}-services`} path={`${prefix}/services`}>{() => <Services language={language} />}</Route>,
    ...SERVICE_IDS.map(id => (
      <Route key={`${language}-service-${id}`} path={`${prefix}/services/${id}`}>
        {() => <ServiceDetail serviceId={id} language={language} />}
      </Route>
    )),
    <Route key={`${language}-solutions`} path={`${prefix}/solutions`}>{() => <Solutions language={language} />}</Route>,
    ...SOLUTION_IDS.map(id => (
      <Route key={`${language}-solution-${id}`} path={`${prefix}/solutions/${id}`}>
        {() => <SolutionDetail solutionId={id} language={language} />}
      </Route>
    )),
    <Route key={`${language}-industries`} path={`${prefix}/industries`}>{() => <Industries language={language} />}</Route>,
    <Route key={`${language}-cases`} path={`${prefix}/case-studies`}>{() => <CaseStudies language={language} />}</Route>,
    <Route key={`${language}-guide`} path={`${prefix}/resources/it-guide`}>{() => <LeadMagnet language={language} />}</Route>,
    <Route key={`${language}-contact`} path={`${prefix}/contact`}>{() => <Contact language={language} />}</Route>,
    <Route key={`${language}-articles`} path={`${prefix}/articles`}>{() => <Articles language={language} />}</Route>,
    <Route key={`${language}-article`} path={`${prefix}/articles/:articleId`}>
      {({ articleId }) => <ArticleDetail articleId={articleId} language={language} />}
    </Route>,
  ];
}

function Router() {
  const [location] = useLocation();

  // Determine language from URL
  const isArabic = location.startsWith("/ar");
  const language: "en" | "ar" = isArabic ? "ar" : "en";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.18 }}
        className="bg-mesh min-h-screen"
      >
        <Suspense fallback={<PageFallback />}>
          <Switch location={location}>
            {/* Arabic first: /ar/services must match before the English table. */}
            {localeRoutes("ar")}
            {localeRoutes("en")}

            {/* 404 Not Found - Must be last */}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
        <ScrollToTop language={language} />
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider switchable={true}>
      <ErrorBoundary>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
