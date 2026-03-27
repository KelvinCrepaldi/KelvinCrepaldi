"use client";

import React, { useRef, useEffect, useCallback } from "react";

import { useIsMobileLayout } from "@/hooks/useIsMobileLayout";

export interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  extraScale?: number;
  /** Camada fixa em tela cheia + cliques via documento (não bloqueia UI). */
  global?: boolean;
  children?: React.ReactNode;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

export function ClickSpark({
  sparkColor = "#fff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
  global: globalMode = false,
  children,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const kickRafRef = useRef<() => void>(() => {});
  const isMobile = useIsMobileLayout();
  const disabled = isMobile;

  const effRadius = isMobile ? Math.min(sparkRadius, 36) : sparkRadius;
  const effCount = isMobile ? Math.min(sparkCount, 4) : sparkCount;
  const effSize = isMobile ? sparkSize * 0.85 : sparkSize;

  useEffect(() => {
    if (disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout: ReturnType<typeof setTimeout>;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);

    resizeCanvas();

    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, [disabled]);

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case "linear":
          return t;
        case "ease-in":
          return t * t;
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing],
  );

  useEffect(() => {
    if (disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number | null = null;

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark: Spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * effRadius * extraScale;
        const lineLength = effSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      if (sparksRef.current.length > 0) {
        rafId = requestAnimationFrame(draw);
      } else {
        rafId = null;
      }
    };

    kickRafRef.current = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(draw);
      }
    };

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      kickRafRef.current = () => {};
    };
  }, [sparkColor, effSize, effRadius, duration, easeFunc, extraScale, disabled]);

  const spawnSparks = useCallback(
    (clientX: number, clientY: number) => {
      if (disabled) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const now = performance.now();
      const newSparks: Spark[] = Array.from({ length: effCount }, (_, i) => ({
        x,
        y,
        angle: (2 * Math.PI * i) / effCount,
        startTime: now,
      }));
      sparksRef.current.push(...newSparks);
      kickRafRef.current();
    },
    [effCount, disabled],
  );

  useEffect(() => {
    if (disabled) return;
    if (!globalMode) return;

    const onDocClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      spawnSparks(e.clientX, e.clientY);
    };

    document.addEventListener("click", onDocClick, true);
    return () => document.removeEventListener("click", onDocClick, true);
  }, [globalMode, spawnSparks, disabled]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (disabled) return;
    if (globalMode) return;
    spawnSparks(e.clientX, e.clientY);
  };

  if (disabled) {
    return globalMode ? null : <>{children}</>;
  }

  if (globalMode) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-[85] h-full w-full"
        aria-hidden
      >
        <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full" onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 block h-full w-full"
      />
      {children}
    </div>
  );
}
