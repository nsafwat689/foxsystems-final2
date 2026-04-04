import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ServiceDetail from "./pages/ServiceDetail";
import Contact from "./pages/Contact";

function Router() {
  // Access current location via wouter. When location changes, scroll to top.
  const [location] = useLocation();
  useEffect(() => {
    // Reset scroll position to top whenever the route changes.
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      
      {/* Service Routes */}
      <Route path="/services/internet">
        {() => <ServiceDetail serviceId="internet" />}
      </Route>
      <Route path="/services/software">
        {() => <ServiceDetail serviceId="software" />}
      </Route>
      <Route path="/services/hardware">
        {() => <ServiceDetail serviceId="hardware" />}
      </Route>
      <Route path="/services/cybersecurity">
        {() => <ServiceDetail serviceId="cybersecurity" />}
      </Route>
      <Route path="/services/infrastructure">
        {() => <ServiceDetail serviceId="infrastructure" />}
      </Route>
      <Route path="/services/web-development">
        {() => <ServiceDetail serviceId="web-development" />}
      </Route>

      {/* Contact Page */}
      <Route path="/contact" component={Contact} />

      {/* Static Pages */}
      <Route path="/about" component={Home} />
      
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
