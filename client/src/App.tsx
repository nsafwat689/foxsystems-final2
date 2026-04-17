import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect, useState } from "react";
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

  // Helper function to navigate with language prefix
  const navigateWithLanguage = (path: string) => {
    return isArabic ? `/ar${path}` : path;
  };

  return (
    <Switch>
      {/* English Routes */}
      <Route path="/">
        {() => <Home language={language} />}
      </Route>

      <Route path="/services">
        {() => <Services language={language} />}
      </Route>

      {/* Service Detail Routes - English */}
      <Route path="/services/internet">
        {() => <ServiceDetail serviceId="internet" language={language} />}
      </Route>
      <Route path="/services/software">
        {() => <ServiceDetail serviceId="software" language={language} />}
      </Route>
      <Route path="/services/hardware">
        {() => <ServiceDetail serviceId="hardware" language={language} />}
      </Route>
      <Route path="/services/cybersecurity">
        {() => <ServiceDetail serviceId="cybersecurity" language={language} />}
      </Route>
      <Route path="/services/infrastructure">
        {() => <ServiceDetail serviceId="infrastructure" language={language} />}
      </Route>
      <Route path="/services/web-development">
        {() => <ServiceDetail serviceId="web-development" language={language} />}
      </Route>

      {/* Contact Page - English */}
      <Route path="/contact">
        {() => <Contact language={language} />}
      </Route>

      {/* Articles Pages - English */}
      <Route path="/articles">
        {() => <Articles language={language} />}
      </Route>
      <Route path="/articles/:articleId">
        {({ articleId }) => <ArticleDetail articleId={articleId} language={language} />}
      </Route>

      {/* Static Pages - English */}
      <Route path="/about">
        {() => <Home language={language} />}
      </Route>

      {/* ===== ARABIC ROUTES ===== */}

      {/* Arabic Home */}
      <Route path="/ar">
        {() => <Home language={language} />}
      </Route>

      {/* Arabic Services */}
      <Route path="/ar/services">
        {() => <Services language={language} />}
      </Route>

      {/* Service Detail Routes - Arabic */}
      <Route path="/ar/services/internet">
        {() => <ServiceDetail serviceId="internet" language={language} />}
      </Route>
      <Route path="/ar/services/software">
        {() => <ServiceDetail serviceId="software" language={language} />}
      </Route>
      <Route path="/ar/services/hardware">
        {() => <ServiceDetail serviceId="hardware" language={language} />}
      </Route>
      <Route path="/ar/services/cybersecurity">
        {() => <ServiceDetail serviceId="cybersecurity" language={language} />}
      </Route>
      <Route path="/ar/services/infrastructure">
        {() => <ServiceDetail serviceId="infrastructure" language={language} />}
      </Route>
      <Route path="/ar/services/web-development">
        {() => <ServiceDetail serviceId="web-development" language={language} />}
      </Route>

      {/* Contact Page - Arabic */}
      <Route path="/ar/contact">
        {() => <Contact language={language} />}
      </Route>

      {/* Articles Pages - Arabic */}
      <Route path="/ar/articles">
        {() => <Articles language={language} />}
      </Route>
      <Route path="/ar/articles/:articleId">
        {({ articleId }) => <ArticleDetail articleId={articleId} language={language} />}
      </Route>

      {/* Static Pages - Arabic */}
      <Route path="/ar/about">
        {() => <Home language={language} />}
      </Route>

      {/* 404 Not Found */}
      <Route component={NotFound} />
    </Switch>
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
