import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Practicalguide from "./pages/Practicalguide/Practicalguide";
import ChatChannels from "./pages/concepts/ChatChannels";
import Meetings from "./pages/concepts/Meetings";
import Scenarios from "./pages/scenarios/Scenarios";
import FAQ from "./pages/support/FAQ";
import Layout from "./components/Layout";
import './index.css';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/practicalguide" component={Practicalguide} />
      <Route path="/concepts/chat-channels" component={ChatChannels} />
      <Route path="/concepts/meetings" component={Meetings} />
      <Route path="/scenarios" component={Scenarios} />
      <Route path="/support/faq" component={FAQ} />
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
          <Layout>
            <Router />
          </Layout>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
