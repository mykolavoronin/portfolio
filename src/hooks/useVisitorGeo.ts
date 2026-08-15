import { useEffect, useState } from "react";
import { guessVisitorGeo, resolveVisitorGeo, type VisitorGeo } from "@/lib/geo";
import { showOccasions } from "@/lib/occasion";

export function useVisitorGeo(): VisitorGeo {
  const [geo, setGeo] = useState<VisitorGeo>(() => guessVisitorGeo());

  useEffect(() => {
    if (!showOccasions) return;
    let alive = true;
    resolveVisitorGeo().then((next) => {
      if (alive) setGeo(next);
    });
    return () => {
      alive = false;
    };
  }, []);

  return geo;
}
