import { useEffect, useState } from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { ScrollManager } from "@/components/ScrollManager";
import signature from "@/assets/signature.png";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
] as const;

const SCROLL_THRESHOLD = 12;

export function Layout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isCard = location.pathname === "/card";

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Digital card: lock to viewport so the card adapts to screen height */
  if (isCard) {
    return (
      <div className="h-dvh max-h-dvh overflow-hidden bg-background flex flex-col">
        <ScrollManager />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <header
          className={cn(
            "shrink-0 z-40 flex items-center justify-between",
            "px-3 min-[380px]:px-4 sm:px-5",
            "pt-[max(0.5rem,env(safe-area-inset-top))] sm:pt-3",
            "pb-1",
          )}
        >
          <Link
            to="/"
            className={cn(
              "flex items-center gap-1.5 min-[380px]:gap-2 rounded-full border border-border/50 bg-background/80 backdrop-blur-md",
              "pl-1 pr-2.5 min-[380px]:pl-1.5 min-[380px]:pr-3 py-1 min-[380px]:py-1.5",
              "text-[11px] min-[380px]:text-xs font-medium text-muted-foreground",
              "hover:text-foreground transition-colors shadow-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
            aria-label={`${site.name} — Home`}
          >
            <Logo className="h-5 w-5 min-[380px]:h-6 min-[380px]:w-6" />
            <span>Portfolio</span>
          </Link>
          <ThemeToggle />
        </header>
        <main id="main" className="flex-1 min-h-0 flex flex-col">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background flex flex-col">
      <ScrollManager />
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {/*
        Pill header:
        - Top: long pill, light outline, same vertical size
        - Scroll: shrinks mostly horizontally (+ tiny vertical compress)
      */}
      <header
        className={cn(
          "sticky top-0 z-40 pointer-events-none",
          "transition-[padding] duration-350 ease-[cubic-bezier(0.19,1,0.22,1)]",
          scrolled ? "pt-2.5 sm:pt-3 px-4 sm:px-6" : "pt-3 sm:pt-4 px-3 sm:px-4",
        )}
      >
        <div className="flex justify-center">
          <div
            className={cn(
              "pointer-events-auto flex w-full items-center gap-1 sm:gap-1.5",
              "rounded-full",
              "bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/80",
              "transition-[max-width,padding,box-shadow,border-color,background-color,backdrop-filter] duration-350 ease-[cubic-bezier(0.19,1,0.22,1)]",
              scrolled
                ? [
                    "max-w-[min(100%,520px)] sm:max-w-[540px]",
                    "border border-border/60",
                    "bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75",
                    "shadow-[0_1px_2px_rgb(0_0_0/0.04),0_10px_28px_-10px_rgb(0_0_0/0.14)]",
                    "dark:shadow-[0_1px_2px_rgb(0_0_0/0.35),0_12px_32px_-10px_rgb(0_0_0/0.55)]",
                    "pl-1.5 pr-1.5 sm:pl-2 sm:pr-1.5 py-[5px] sm:py-1.5",
                  ]
                : [
                    "max-w-[min(100%,720px)] sm:max-w-[740px]",
                    "border border-border/35 dark:border-border/45",
                    "shadow-none",
                    "pl-2 pr-2 sm:pl-2.5 sm:pr-2 py-1.5 sm:py-2",
                  ],
            )}
          >
            <Link
              to="/"
              className={cn(
                "shrink-0 flex items-center justify-center rounded-full",
                "h-9 w-9 sm:h-9 sm:w-9",
                "transition-transform duration-200 ease-out",
                "hover:scale-[1.04] active:scale-[0.96]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
              aria-label={`${site.name} — Home`}
            >
              <Logo className="h-7 w-7 sm:h-7 sm:w-7" />
            </Link>

            <span className="hidden sm:block h-4 w-px shrink-0 bg-border/60" aria-hidden />

            <nav
              className="flex flex-1 items-center gap-0.5 min-w-0 overflow-x-auto scrollbar-hide"
              aria-label="Primary"
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "shrink-0 inline-flex items-center justify-center rounded-full",
                      "min-h-9 px-2.5 sm:px-3",
                      "whitespace-nowrap text-[13px] sm:text-sm",
                      "transition-[color,background-color] duration-150 ease-out",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      isActive
                        ? "bg-muted text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="shrink-0 pl-0.5">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-auto border-t border-border/40 safe-pb">
        <div
          className={cn(
            "site-shell",
            "pt-10 pb-10 sm:pt-12 sm:pb-14",
            "flex flex-col-reverse sm:flex-row",
            "items-stretch sm:items-end",
            "justify-between",
            "gap-6 sm:gap-8",
          )}
        >
          {/* Copyright — bottom on mobile, left on desktop */}
          <p className="text-sm text-muted-foreground sm:pb-1">
            <span className="tabular-nums">© {new Date().getFullYear()}</span>
            <span className="mx-1.5 text-border" aria-hidden>
              ·
            </span>
            <span>{site.name}</span>
          </p>

          {/* Signature — top on mobile (visual mark), right on desktop */}
          <div className="flex sm:justify-end">
            <img
              src={signature}
              alt=""
              loading="lazy"
              width={1536}
              height={1024}
              className={cn(
                "h-[4.5rem] sm:h-20 md:h-[5.5rem] w-auto",
                "max-w-[12.5rem] sm:max-w-[15rem]",
                "object-contain object-left sm:object-right",
                "select-none pointer-events-none",
                "opacity-70 dark:invert dark:opacity-80",
              )}
              draggable={false}
              aria-hidden
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
