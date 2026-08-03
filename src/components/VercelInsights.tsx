import { useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

/**
 * Vercel Web Analytics + Speed Insights.
 * Passes the current React Router path so SPA navigations are attributed correctly.
 */
export function VercelInsights() {
  const { pathname, search } = useLocation();
  const path = `${pathname}${search}`;

  return (
    <>
      <Analytics framework="vite" route={pathname} path={path} />
      <SpeedInsights framework="vite" route={pathname} />
    </>
  );
}
