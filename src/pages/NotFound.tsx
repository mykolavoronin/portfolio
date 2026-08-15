import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Home, Mail } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageEnter } from "@/components/Motion";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { showSkills } from "@/data/skills";

const shortcuts = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  ...(showSkills ? [{ to: "/skills", label: "Skills" }] : []),
  { to: "/contact", label: "Contact" },
  { to: "/card", label: "Digital card" },
];

export default function NotFound() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <PageEnter className="site-shell page-pad">
      <Seo
        title={`Page not found — ${site.name}`}
        description="This page doesn't exist. Head back home or jump to About or Contact."
        path={path}
      />

      <div className="mx-auto max-w-lg">
        <p className="story-tag">404</p>

        <div className="surface p-6 sm:p-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Not found
          </p>
          <h1 className="mt-2 text-fluid-3xl font-semibold tracking-tight text-foreground">
            This page{" "}
            <span className="font-serif-italic font-normal text-muted-foreground">isn&apos;t here.</span>
          </h1>
          <p className="mt-3 text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
            The address{" "}
            <code className="rounded-md border border-border/60 bg-muted/50 px-1.5 py-0.5 text-[12px] text-foreground/80 tabular-nums break-all">
              {path}
            </code>{" "}
            doesn&apos;t match anything on this site. It may have moved, or the link is outdated.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <Button asChild>
              <Link to="/">
                <Home className="h-4 w-4" />
                Back home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">
                <Mail className="h-4 w-4" />
                Contact
              </Link>
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                if (window.history.length > 1) window.history.back();
                else window.location.assign("/");
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              Go back
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-3">
            Try one of these
          </p>
          <ul className="flex flex-wrap gap-2">
            {shortcuts.map((s) => (
              <li key={s.to}>
                <Link
                  to={s.to}
                  className="inline-flex items-center rounded-full border border-border/65 bg-card px-3 py-1.5 text-xs font-medium text-foreground/90 shadow-sm transition-colors hover:border-foreground/15 hover:bg-muted/40"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageEnter>
  );
}
