import { Switch, Route } from "wouter";
import MainInputPage from "@/pages/MainInputPage";
import RecommendPage from "@/pages/RecommendPage";
import NotFound from "@/pages/not-found";
import { ThemeToggle } from "@/components/ui/theme-toggle";

function Router() {
  return (
    <Switch>
      <Route path="/" component={MainInputPage}/>
      <Route path="/recommendations" component={RecommendPage}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 right-0 p-4 z-50">
        <ThemeToggle />
      </header>
      <Router />
    </div>
  );
}

export default App;
