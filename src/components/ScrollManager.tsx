import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/** Scroll Y per React Router history entry key */
const positions = new Map<string, number>();

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Instant scroll that ignores CSS `scroll-behavior: smooth` */
function scrollInstant(y: number) {
  try {
    window.scrollTo({ top: y, left: 0, behavior: "instant" as ScrollBehavior });
  } catch {
    window.scrollTo(0, y);
  }
}

function scrollSmooth(y: number) {
  if (prefersReducedMotion()) {
    scrollInstant(y);
    return;
  }
  window.scrollTo({ top: y, left: 0, behavior: "smooth" });
}

function scrollToHash(hash: string, smooth: boolean) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({
    behavior: smooth && !prefersReducedMotion() ? "smooth" : "auto",
    block: "start",
  });
  return true;
}

function applyHashWithRetry(hash: string, smooth: boolean) {
  const apply = () => scrollToHash(hash, smooth);
  apply();
  const t1 = window.setTimeout(apply, 0);
  const t2 = window.setTimeout(apply, 80);
  const t3 = window.setTimeout(apply, 200);
  return () => {
    window.clearTimeout(t1);
    window.clearTimeout(t2);
    window.clearTimeout(t3);
  };
}

/**
 * Smooth scroll on forward navigations; restore scroll on back/forward (POP).
 * Hash targets are scrolled into view (smooth when pushing).
 */
export function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const prevKeyRef = useRef(location.key);
  const bootstrapped = useRef(false);

  // Keep latest scroll for the active history entry
  useEffect(() => {
    const key = location.key;
    let ticking = false;

    const persist = () => {
      positions.set(key, window.scrollY);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(persist);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      positions.set(key, window.scrollY);
      window.removeEventListener("scroll", onScroll);
    };
  }, [location.key]);

  useLayoutEffect(() => {
    // Own SPA scroll; avoid clashing with the browser on back/forward
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // First paint: don't yank the viewport (refresh / deep-link)
    if (!bootstrapped.current) {
      bootstrapped.current = true;
      prevKeyRef.current = location.key;
      if (location.hash) {
        return applyHashWithRetry(location.hash, false);
      }
      positions.set(location.key, window.scrollY);
      return;
    }

    const key = location.key;
    const isPop = navigationType === "POP";
    const keyChanged = prevKeyRef.current !== key;
    prevKeyRef.current = key;

    // In-page hash change (e.g. skip link) or navigation with hash
    if (location.hash) {
      const smooth = !isPop;
      return applyHashWithRetry(location.hash, smooth);
    }

    // Browser back / forward → restore saved offset for this history entry
    if (isPop && positions.has(key)) {
      const y = positions.get(key) ?? 0;
      scrollInstant(y);
      const reapply = () => scrollInstant(y);
      const id = requestAnimationFrame(() => {
        reapply();
        requestAnimationFrame(reapply);
      });
      const t1 = window.setTimeout(reapply, 50);
      const t2 = window.setTimeout(reapply, 160);
      return () => {
        cancelAnimationFrame(id);
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    }

    // Forward navigation (or POP without a saved position) → top of page
    if (!keyChanged && !isPop) return;

    if (isPop) {
      scrollInstant(0);
    } else {
      scrollSmooth(0);
    }
  }, [location.key, location.pathname, location.hash, navigationType]);

  return null;
}
