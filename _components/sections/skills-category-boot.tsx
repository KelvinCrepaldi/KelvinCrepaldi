"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function clampInt(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.round(n)));
}

type SkillsCategoryBootProps = {
  durationSec?: number;
  onComplete?: () => void;
};

export function SkillsCategoryBoot({
  durationSec = 1.2,
  onComplete,
}: SkillsCategoryBootProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });
  const [pct, setPct] = useState(0);
  const completedRef = useRef(false);

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

  useEffect(() => {
    if (!done || completedRef.current) return;
    completedRef.current = true;
    onComplete?.();
  }, [done, onComplete]);

  return (
    <span
      ref={ref}
      className="shrink-0 font-mono text-[10px] font-bold uppercase tabular-nums"
      aria-live="polite"
    >
      {done ? (
        <span className="text-terminal-accent/90">[OK]</span>
      ) : (
        <span className="inline-flex items-center gap-1 text-terminal-accent/55">
          <span>[</span>
          <span className="relative h-1 w-10 overflow-hidden rounded-full bg-terminal-accent/15">
            <span
              className="absolute inset-y-0 left-0 bg-terminal-accent/75"
              style={{ width: `${pct}%` }}
            />
          </span>
          <span>]</span>
        </span>
      )}
    </span>
  );
}
