import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function clampInt(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.round(n)));
}

export default function LoadingAnimation({
  durationSec,
}: {
  durationSec: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });
  const [pct, setPct] = useState(0);

  const durationMs = Math.max(0.4, durationSec) * 800;
  const done = pct >= 100;

  useEffect(() => {
    if (!isInView || done) return;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const next = clampInt(Math.floor(t * 10) * 10, 0, 100);
      setPct((prev) => (prev === next ? prev : next));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, durationMs, done]);

  return (
    <span
      ref={ref}
      className="font-mono text-[10px] font-bold uppercase shrink-0 px-2 py-0.5 tabular-nums"
    >
      {done ? (
        <span className="text-emerald-700/80 dark:text-emerald-400/90">
          [OK]
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-on-surface/50">
          <span>[</span>
          <span className="relative h-1 w-10 overflow-hidden rounded-full bg-on-surface/15">
            <span
              className="absolute inset-y-0 left-0 bg-on-surface/50"
              style={{ width: `${pct}%` }}
            />
          </span>
          <span>]</span>
        </span>
      )}
    </span>
  );
}
