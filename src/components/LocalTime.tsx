import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const TZ = "Europe/Madrid";

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

/** Live Barcelona local time (updates every 30s). */
export function LocalTime({
  className,
  showIcon = true,
  showCity = true,
}: {
  className?: string;
  showIcon?: boolean;
  /** Append "· Barcelona" after the clock */
  showCity?: boolean;
}) {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={cn("inline-flex items-center gap-1.5 tabular-nums", className)}>
      {showIcon ? <Clock className="h-3 w-3 shrink-0" strokeWidth={1.75} aria-hidden /> : null}
      <span>
        <span className="sr-only">Local time in Barcelona: </span>
        {time}
        {showCity ? <span className="text-muted-foreground/80"> · Barcelona</span> : null}
      </span>
    </span>
  );
}
