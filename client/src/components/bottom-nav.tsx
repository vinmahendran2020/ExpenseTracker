import { Home, Plus, Clock, PieChart, User } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function BottomNav() {
  const [location] = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <div className="container max-w-md mx-auto">
        <div className="flex justify-between items-center py-2 px-4">
          <Link href="/">
            <a className="flex flex-col items-center gap-1">
              <Home className={`h-6 w-6 ${location === "/" ? "text-primary" : "text-muted-foreground"}`} />
            </a>
          </Link>
          <Link href="/history">
            <a className="flex flex-col items-center gap-1">
              <Clock className="h-6 w-6 text-muted-foreground" />
            </a>
          </Link>
          <Link href="/new">
            <a className="flex flex-col items-center gap-1">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center -mt-6">
                <Plus className="h-6 w-6 text-primary-foreground" />
              </div>
            </a>
          </Link>
          <Link href="/stats">
            <a className="flex flex-col items-center gap-1">
              <PieChart className="h-6 w-6 text-muted-foreground" />
            </a>
          </Link>
          <Link href="/profile">
            <a className="flex flex-col items-center gap-1">
              <User className="h-6 w-6 text-muted-foreground" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
