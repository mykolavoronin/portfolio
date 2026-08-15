import { useEffect, useState } from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { SeasonalDress, useOccasion, withOccasion } from "@/components/SeasonalDress";
import { ScrollManager } from "@/components/ScrollManager";
import signature from "@/assets/signature.webp";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import { showSkills } from "@/data/skills";

const navLinks = [
  { to: "/about", label: "About" },
  ...(showSkills ? [{ to: "/skills", label: "Skills" }] : []),
  { to: "/contact", label: "Contact" },
];

const SCROLL_THRESHOLD = 12;

export function Layout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isCard = location.pathname === "/card";
  const occasion = useOccasion();

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
  }, [location.pathname]);

  /* Digital card: lock to the viewport so the sheet never scrolls */
  if (isCard) {
    return (
      <div
        className="page-shell card-lock h-dvh max-h-dvh overflow-hidden bg-background flex flex-col"
        data-occasion={occasion?.id}
      >
        <ScrollManager />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <header className="site-header card-chrome shrink-0">
          <Link
            to={withOccasion("/", occasion?.id)}
            className={cn(
              "flex items-center gap-1.5 rounded-full border border-border/50 bg-background/80",
              "h-9 pl-1 pr-2.5",
              "text-xs font-medium text-muted-foreground",
              "hover:text-foreground transition-colors shadow-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
            aria-label={`${site.name} — Home`}
          >
            <span className="relative inline-flex">
              <Logo className="h-5 w-5" />
              {occasion ? <SeasonalDress kind={occasion.dress} size="sm" /> : null}
            </span>
            <span>Portfolio</span>
          </Link>
          <ThemeToggle />
        </header>
        <main id="main" className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="page-shell min-h-dvh bg-background flex flex-col" data-occasion={occasion?.id}>
      <ScrollManager />
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {/*
        Pill header:
        - Top: slightly wider than the column, light outline
        - Scroll: compresses horizontally into a floating chip
      */}
      <header className={cn("site-header sticky top-0 pointer-events-none", scrolled && "is-scrolled")}>
        <div className="header-bar">
          <div
            className={cn(
              "header-pill pointer-events-auto flex w-full items-center gap-1 sm:gap-1.5 rounded-full",
              scrolled && "header-pill-scrolled",
            )}
          >
            <Link
              to={withOccasion("/", occasion?.id)}
              className={cn(
                "relative shrink-0 flex items-center justify-center rounded-full",
                "h-9 w-9",
                "active:scale-[0.96] transition-transform duration-150 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
              aria-label={`${site.name} — Home`}
            >
              <span className="relative inline-flex">
                <Logo className="h-7 w-7" />
                {occasion ? <SeasonalDress kind={occasion.dress} size="sm" /> : null}
              </span>
            </Link>

            <span className="hidden sm:block h-4 w-px shrink-0 bg-border/60" aria-hidden />

            <nav
              className="flex flex-1 items-center gap-0.5 min-w-0 overflow-x-auto scrollbar-hide"
              aria-label="Primary"
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={withOccasion(link.to, occasion?.id)}
                  className="nav-pill shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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

      <footer className="site-footer">
        <div className="site-shell site-footer-inner">
          <p className="site-footer-copy">
            <span className="tabular-nums">© {new Date().getFullYear()}</span>
            <span className="mx-1.5 text-border" aria-hidden>
              ·
            </span>
            <span>{site.name}</span>
          </p>
          <div className="site-signature">
            <img
              src={signature}
              alt=""
              loading="lazy"
              width={1536}
              height={1024}
              draggable={false}
              aria-hidden
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
