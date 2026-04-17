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

  return (
    <Switch>
      {/* ===== ENGLISH ROUTES ===== */}
      
      {/* Home */}
      <Route path="/">
        {() => <Home language={language} />}
      </Route>

      {/* Services Overview */}
      <Route path="/services">
        {() => <Services language={language} />}
      </Route>

      {/* Service Detail - Dynamic Route */}
      <Route path="/services/:serviceId">
        {({ serviceId }) => <ServiceDetail serviceId={serviceId} language={language} />}
      </Route>

      {/* Contact Page */}
      <Route path="/contact">
        {() => <Contact language={language} />}
      </Route>

      {/* Articles */}
      <Route path="/articles">
        {() => <Articles language={language} />}
      </Route>

      {/* Article Detail */}
      <Route path="/articles/:articleId">
        {({ articleId }) => <ArticleDetail articleId={articleId} language={language} />}
      </Route>

      {/* About (redirects to Home) */}
      <Route path="/about">
        {() => <Home language={language} />}
      </Route>

      {/* ===== ARABIC ROUTES ===== */}

      {/* Arabic Home */}
      <Route path="/ar">
        {() => <Home language={language} />}
      </Route>

      {/* Arabic Services Overview */}
      <Route path="/ar/services">
        {() => <Services language={language} />}
      </Route>

      {/* Arabic Service Detail - Dynamic Route */}
      <Route path="/ar/services/:serviceId">
        {({ serviceId }) => <ServiceDetail serviceId={serviceId} language={language} />}
      </Route>

      {/* Arabic Contact Page */}
      <Route path="/ar/contact">
        {() => <Contact language={language} />}
      </Route>

      {/* Arabic Articles */}
      <Route path="/ar/articles">
        {() => <Articles language={language} />}
      </Route>

      {/* Arabic Article Detail */}
      <Route path="/ar/articles/:articleId">
        {({ articleId }) => <ArticleDetail articleId={articleId} language={language} />}
      </Route>

      {/* Arabic About (redirects to Arabic Home) */}
      <Route path="/ar/about">
        {() => <Home language={language} />}
      </Route>

      {/* 404 Not Found - Must be last */}
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
