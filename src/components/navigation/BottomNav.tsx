import { NavLink } from "react-router-dom";
import { Home, BookOpen, Bot, Store, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/learning", label: "Learning", icon: BookOpen },
  { to: "/tools", label: "AI Tools", icon: Bot },
  { to: "/market", label: "Market", icon: Store },
  { to: "/account", label: "Account", icon: User },
];

export function BottomNav() {
  return (
    <nav aria-label="Primary" className="fixed bottom-0 left-0 right-0 z-40">
      <div className="mx-auto max-w-screen-md">
        <div className="mx-4 mb-4 rounded-xl border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <ul className="grid grid-cols-5">
            {items.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      "flex flex-col items-center justify-center gap-1 py-3 text-xs font-medium transition-[color,transform]",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )
                  }
                  aria-label={label}
                >
                  {({ isActive }) => (
                    <div className="relative flex flex-col items-center">
                      <Icon className={cn("h-5 w-5 transition-transform", isActive && "scale-110")} />
                      <span className="mt-1 leading-none">{label}</span>
                      {isActive && (
                        <span
                          className="absolute -bottom-2 h-1 w-6 rounded-full bg-primary/80 shadow-[var(--shadow-elevated)]"
                          aria-hidden
                        />
                      )}
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default BottomNav;
