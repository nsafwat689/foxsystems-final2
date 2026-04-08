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

function Router() {
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location]);

  return (
    <Switch>
      <Route path="/">
        {() => <Home language={language} setLanguage={setLanguage} />}
      </Route>

      <Route path="/services">
        {() => <Services language={language} setLanguage={setLanguage} />}
      </Route>

      {/* Service Detail Routes */}
      <Route path="/services/internet">
        {() => <ServiceDetail serviceId="internet" language={language} setLanguage={setLanguage} />}
      </Route>
      <Route path="/services/software">
        {() => <ServiceDetail serviceId="software" language={language} setLanguage={setLanguage} />}
      </Route>
      <Route path="/services/hardware">
        {() => <ServiceDetail serviceId="hardware" language={language} setLanguage={setLanguage} />}
      </Route>
      <Route path="/services/cybersecurity">
        {() => <ServiceDetail serviceId="cybersecurity" language={language} setLanguage={setLanguage} />}
      </Route>
      <Route path="/services/infrastructure">
        {() => <ServiceDetail serviceId="infrastructure" language={language} setLanguage={setLanguage} />}
      </Route>
      <Route path="/services/web-development">
        {() => <ServiceDetail serviceId="web-development" language={language} setLanguage={setLanguage} />}
      </Route>

      {/* Contact Page */}
      <Route path="/contact">
        {() => <Contact language={language} setLanguage={setLanguage} />}
      </Route>

      {/* Static Pages */}
      <Route path="/about">
        {() => <Home language={language} setLanguage={setLanguage} />}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
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
