import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ServiceDetail from "./pages/ServiceDetail";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";

function Router() {
  const [location] = useLocation();
  
  // Determine language from URL
  const isArabic = location.startsWith("/ar");
  const language: "en" | "ar" = isArabic ? "ar" : "en";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="bg-mesh min-h-screen"
      >
        <Switch location={location}>
          {/* ===== ARABIC ROUTES (MUST BE FIRST) ===== */}

      {/* Arabic Home */}
      <Route path="/ar">
        {() => <Home language="ar" />}
      </Route>

      {/* Arabic Services Overview */}
      <Route path="/ar/services">
        {() => <Services language="ar" />}
      </Route>

      {/* Arabic Service Detail - Specific routes for each service */}
      <Route path="/ar/services/internet">
        {() => <ServiceDetail serviceId="internet" language="ar" />}
      </Route>
      <Route path="/ar/services/software">
        {() => <ServiceDetail serviceId="software" language="ar" />}
      </Route>
      <Route path="/ar/services/hardware">
        {() => <ServiceDetail serviceId="hardware" language="ar" />}
      </Route>
      <Route path="/ar/services/cybersecurity">
        {() => <ServiceDetail serviceId="cybersecurity" language="ar" />}
      </Route>
      <Route path="/ar/services/infrastructure">
        {() => <ServiceDetail serviceId="infrastructure" language="ar" />}
      </Route>
      <Route path="/ar/services/web-development">
        {() => <ServiceDetail serviceId="web-development" language="ar" />}
      </Route>

      {/* Arabic Contact Page */}
      <Route path="/ar/contact">
        {() => <Contact language="ar" />}
      </Route>

      {/* Arabic Articles */}
      <Route path="/ar/articles">
        {() => <Articles language="ar" />}
      </Route>

      {/* Arabic Article Detail */}
      <Route path="/ar/articles/:articleId">
        {({ articleId }) => <ArticleDetail articleId={articleId} language="ar" />}
      </Route>

      {/* Arabic About (redirects to Arabic Home) */}
      <Route path="/ar/about">
        {() => <Home language="ar" />}
      </Route>

      {/* ===== ENGLISH ROUTES ===== */}

      {/* Home */}
      <Route path="/">
        {() => <Home language="en" />}
      </Route>

      {/* Services Overview */}
      <Route path="/services">
        {() => <Services language="en" />}
      </Route>

      {/* Service Detail - Specific routes for each service */}
      <Route path="/services/internet">
        {() => <ServiceDetail serviceId="internet" language="en" />}
      </Route>
      <Route path="/services/software">
        {() => <ServiceDetail serviceId="software" language="en" />}
      </Route>
      <Route path="/services/hardware">
        {() => <ServiceDetail serviceId="hardware" language="en" />}
      </Route>
      <Route path="/services/cybersecurity">
        {() => <ServiceDetail serviceId="cybersecurity" language="en" />}
      </Route>
      <Route path="/services/infrastructure">
        {() => <ServiceDetail serviceId="infrastructure" language="en" />}
      </Route>
      <Route path="/services/web-development">
        {() => <ServiceDetail serviceId="web-development" language="en" />}
      </Route>

      {/* Contact Page */}
      <Route path="/contact">
        {() => <Contact language="en" />}
      </Route>

      {/* Articles */}
      <Route path="/articles">
        {() => <Articles language="en" />}
      </Route>

      {/* Article Detail */}
      <Route path="/articles/:articleId">
        {({ articleId }) => <ArticleDetail articleId={articleId} language="en" />}
      </Route>

      {/* About (redirects to Home) */}
      <Route path="/about">
        {() => <Home language="en" />}
      </Route>

          {/* 404 Not Found - Must be last */}
          <Route component={NotFound} />
        </Switch>
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
