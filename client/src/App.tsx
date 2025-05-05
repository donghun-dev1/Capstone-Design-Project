import { Switch, Route } from "wouter";
import MainInputPage from "@/pages/MainInputPage";
import RecommendPage from "@/pages/RecommendPage";
import MealPlanPage from "@/pages/MealPlanPage";
import NotFound from "@/pages/not-found";
import { ThemeToggle } from "@/components/ui/theme-toggle";

function Router() {
  return (
    <Switch>
      <Route path="/" component={MainInputPage}/>
      <Route path="/recommendations" component={RecommendPage}/>
      <Route path="/meal-plan" component={MealPlanPage}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Background patterns - using pseudo-elements and absolute positioning */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {/* Large gradient blob in top-left */}
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl blink-light" style={{ animationDelay: '0s' }} />
        
        {/* Medium gradient circle in bottom-right */}
        <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] rounded-full bg-gradient-to-tl from-primary/5 to-transparent blur-2xl blink-light" style={{ animationDelay: '2s' }} />
        
        {/* Small accent circles */}
        <div className="absolute top-[30%] right-[20%] w-[5%] h-[5%] rounded-full bg-primary/5 blur-xl blink-light" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-[40%] left-[15%] w-[3%] h-[3%] rounded-full bg-primary/10 blur-md blink-light" style={{ animationDelay: '6s' }} />
        
        {/* Glowing dots */}
        <div className="absolute top-[15%] left-[30%] w-[8px] h-[8px] rounded-full bg-primary/30 blink-light" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[60%] right-[35%] w-[6px] h-[6px] rounded-full bg-primary/20 blink-light" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-[25%] left-[40%] w-[4px] h-[4px] rounded-full bg-primary/30 blink-light" style={{ animationDelay: '5s' }} />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
      </div>
      
      <header className="fixed top-0 right-0 p-4 z-50">
        <ThemeToggle />
      </header>
      <div className="relative z-10">
        <Router />
      </div>
    </div>
  );
}

export default App;
