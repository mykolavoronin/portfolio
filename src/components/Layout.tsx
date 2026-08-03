import { useEffect, useState } from "react";
import { Outlet, Link, useLocation, NavLink } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import signature from "@/assets/signature.png";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
] as const;

const SCROLL_THRESHOLD = 12;

export function Layout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location.pathname, location.hash]);

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

  return (
    <div className="min-h-dvh bg-background flex flex-col">
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
          /* Slightly more inset when floating — reads as width shrink */
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
                    /* Narrower floating pill — height almost unchanged */
                    "max-w-[min(100%,520px)] sm:max-w-[540px]",
                    "border border-border/60",
                    "bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75",
                    "shadow-[0_1px_2px_rgb(0_0_0/0.04),0_10px_28px_-10px_rgb(0_0_0/0.14)]",
                    "dark:shadow-[0_1px_2px_rgb(0_0_0/0.35),0_12px_32px_-10px_rgb(0_0_0/0.55)]",
                    /* Tiny vertical compress only */
                    "pl-1.5 pr-1.5 sm:pl-2 sm:pr-1.5 py-[5px] sm:py-1.5",
                  ]
                : [
                    /* Longer pill — same vertical rhythm, hairline outline */
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

      <footer className="mt-16 sm:mt-24 border-t border-border/40 safe-pb">
        <div className="site-shell py-10 sm:py-12 flex flex-col gap-7">
          <nav className="flex flex-wrap gap-0.5 -mx-1" aria-label="Footer">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="nav-pill">
                {link.label}
              </Link>
            ))}
            <Link to="/recommendations" className="nav-pill">
              Reading
            </Link>
            <a href={site.github} target="_blank" rel="noreferrer" className="nav-pill">
              GitHub
            </a>
          </nav>

          <div className="flex flex-col-reverse sm:flex-row items-start sm:items-end justify-between gap-6 px-1">
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <p>
                © {new Date().getFullYear()} {site.name}
              </p>
              <p className="font-serif-italic text-[15px] text-foreground/70">Crafted with care.</p>
            </div>
            <img
              src={signature}
              alt=""
              loading="lazy"
              width={1536}
              height={1024}
              className="h-12 sm:h-16 w-auto select-none opacity-65 dark:invert dark:opacity-75 pointer-events-none"
              draggable={false}
              aria-hidden
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
