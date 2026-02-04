import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";

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
      <Route path="/services" component={Services} />
      <Route path="/service/:serviceId">
        {({ serviceId }) => <ServiceDetail serviceId={serviceId as string} />}
      </Route>
      <Route path="/articles" component={Articles} />
      <Route path="/article/:articleId">
        {({ articleId }) => <ArticleDetail articleId={articleId as string} />}
      </Route>
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