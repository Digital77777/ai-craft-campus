import { ReactNode, useEffect } from "react";
import BottomNav from "@/components/navigation/BottomNav";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  // Signature moment: ambient spotlight reacting to cursor (respects reduced motion)
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const x = `${e.clientX}px`;
      const y = `${e.clientY}px`;
      document.documentElement.style.setProperty("--cursor-x", x);
      document.documentElement.style.setProperty("--cursor-y", y);
    };
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (mq.matches) window.addEventListener("pointermove", handle);
    return () => window.removeEventListener("pointermove", handle);
  }, []);

  return (
    <div className="min-h-dvh bg-gradient-subtle">
      <div className="ambient-spotlight" aria-hidden />
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-screen-lg items-center justify-between px-6 py-4">
          <a href="/" className="group inline-flex items-center gap-2">
            <div className="size-7 rounded-md bg-gradient-primary shadow-[var(--shadow-elevated)] transition-transform group-hover:scale-110" />
            <span className="text-sm font-semibold tracking-tight">AI Campus</span>
          </a>
          <a href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a>
        </div>
      </header>
      <main className="mx-auto mb-24 max-w-screen-lg px-6 py-8">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default AppLayout;
