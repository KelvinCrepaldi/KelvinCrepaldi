"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useIsMobileLayout } from "@/hooks/useIsMobileLayout";

/** Espaço lógico do canvas (viewBox equivalente) */
export const CLOCK_CANVAS_LOGICAL = 400;
const CX = 200;
const CY = 200;

/** Cor dos traços alinhada ao tema (`--on-surface` no globals.css). */
function getOnSurfaceRgba(opacity: number): string {
  if (typeof window === "undefined") {
    return `rgba(54, 51, 34, ${opacity})`;
  }
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--on-surface")
    .trim();
  const parts = raw.split(/\s+/).filter(Boolean).map(Number);
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) {
    return `rgba(54, 51, 34, ${opacity})`;
  }
  return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${opacity})`;
}

/** Tamanho do bloco do fundo: min(vh, vw) */
const SIZE_VH = "90";
const SIZE_VW = "90";

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function easeStep(t: number): number {
  const t2 = 1 - Math.pow(1 - t, 3);
  return t * 0.35 + t2 * 0.65;
}

function drawRadialTicks(
  ctx: CanvasRenderingContext2D,
  rotationDeg: number,
  radius: number,
  tickLen: number,
  count: number,
  opacity: number,
  strokeWidth: number,
) {
  const rad = (rotationDeg * Math.PI) / 180;
  ctx.save();
  ctx.translate(CX, CY);
  ctx.rotate(rad);
  ctx.translate(-CX, -CY);
  ctx.strokeStyle = getOnSurfaceRgba(opacity);
  ctx.lineWidth = strokeWidth;
  ctx.lineCap = "round";
  for (let i = 0; i < count; i++) {
    const angle = (2 * Math.PI * i) / count;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(CX + radius * cos, CY + radius * sin);
    ctx.lineTo(CX + (radius + tickLen) * cos, CY + (radius + tickLen) * sin);
    ctx.stroke();
  }
  ctx.restore();
}

function syncCanvasPixelSize(canvas: HTMLCanvasElement) {
  const d = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = CLOCK_CANVAS_LOGICAL * d;
  canvas.height = CLOCK_CANVAS_LOGICAL * d;
}

export type ClockCircleCanvasRandomProps = {
  mode: "random";
  radius: number;
  tickCount: number;
  tickLength: number;
  opacity: number;
  strokeWidth?: number;
  delay: number;
  degrees: number;
  speed: number;
};

export type ClockCircleCanvasLinearProps = {
  mode: "linear";
  radius: number;
  tickCount: number;
  tickLength: number;
  opacity: number;
  strokeWidth?: number;
  duration: number;
  direction: -1 | 1;
};

export type ClockCircleCanvasProps =
  | ClockCircleCanvasRandomProps
  | ClockCircleCanvasLinearProps;

/**
 * Um anel de traços radiais no canvas. Empilhe vários com `absolute inset-0`
 * (último filho = por cima).
 */
export function ClockCircleCanvas({
  staticVisual: staticVisualProp,
  ...props
}: ClockCircleCanvasProps & {
  /** Se omitido, usa layout mobile (sem animação). */
  staticVisual?: boolean;
}) {
  const isMobile = useIsMobileLayout();
  const staticVisual = staticVisualProp ?? isMobile;
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const strokeW = props.strokeWidth ?? 1;

  const paint = useCallback(
    (angleDeg: number) => {
      const canvas = ref.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawRadialTicks(
        ctx,
        angleDeg,
        props.radius,
        props.tickLength,
        props.tickCount,
        props.opacity,
        strokeW,
      );
    },
    [props.radius, props.tickLength, props.tickCount, props.opacity, strokeW],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || staticVisual || !mounted) return;

    if (props.mode === "linear") {
      let alive = true;
      const syncSize = () => syncCanvasPixelSize(canvas);
      syncSize();
      const parent = canvas.parentElement;
      const ro = parent ? new ResizeObserver(syncSize) : null;
      if (parent) ro!.observe(parent);

      let angle = 0;
      let prev = performance.now();
      const tick = (now: number) => {
        if (!alive) return;
        const dt = (now - prev) / 1000;
        prev = now;
        angle += ((360 * props.direction) / props.duration) * dt;
        paint(angle);
        animRef.current = requestAnimationFrame(tick);
      };
      animRef.current = requestAnimationFrame(tick);
      return () => {
        alive = false;
        cancelAnimationFrame(animRef.current);
        ro?.disconnect();
      };
    }

    let alive = true;
    const syncSize = () => syncCanvasPixelSize(canvas);
    syncSize();
    const parent = canvas.parentElement;
    const ro = parent ? new ResizeObserver(syncSize) : null;
    if (parent) ro!.observe(parent);

    let r = 0;
    let target = 0;
    let anim = { start: 0, from: 0, to: 0, active: false };

    const id = window.setInterval(() => {
      target += randomBetween(-props.degrees, props.degrees);
      anim = { start: performance.now(), from: r, to: target, active: true };
    }, props.delay * 1000);

    const speedMs = props.speed * 1000;

    const tick = (now: number) => {
      if (!alive) return;
      if (anim.active) {
        const t = Math.min(1, (now - anim.start) / speedMs);
        r = anim.from + (anim.to - anim.from) * easeStep(t);
        if (t >= 1) anim.active = false;
      }
      paint(r);
      animRef.current = requestAnimationFrame(tick);
    };

    target += randomBetween(-props.degrees, props.degrees);
    anim = { start: performance.now(), from: 0, to: target, active: true };
    animRef.current = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(animRef.current);
      clearInterval(id);
      ro?.disconnect();
    };
  }, [
    staticVisual,
    mounted,
    paint,
    props.mode,
    ...(props.mode === "linear"
      ? [props.duration, props.direction]
      : [props.delay, props.degrees, props.speed]),
  ]);

  useEffect(() => {
    if (!staticVisual || !mounted) return;
    const canvas = ref.current;
    if (!canvas) return;

    const syncAndPaint = () => {
      syncCanvasPixelSize(canvas);
      paint(0);
    };

    syncAndPaint();
    const parent = canvas.parentElement;
    const ro = parent ? new ResizeObserver(syncAndPaint) : null;
    if (parent) ro!.observe(parent);

    const obs = new MutationObserver(syncAndPaint);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => {
      ro?.disconnect();
      obs.disconnect();
    };
  }, [staticVisual, mounted, paint]);

  if (!mounted) return null;

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full"
      width={CLOCK_CANVAS_LOGICAL}
      height={CLOCK_CANVAS_LOGICAL}
      aria-hidden
    />
  );
}

type Position = "left" | "right" | "center";

/**
 * Container do fundo: posiciona o quadrado e renderiza os filhos (ex.: 3× `ClockCircleCanvas`).
 */
export function ClockCirclesBackground({
  position = "left",
  children,
}: {
  position?: Position;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const isRight = position === "right";
  const isCenter = position === "center";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center overflow-visible ${
        isCenter
          ? "justify-center"
          : isRight
            ? "right-0 justify-end w-1/2"
            : "left-0 justify-start w-1/2"
      }`}
      aria-hidden
    >
      <div
        className="relative shrink-0 aspect-square"
        style={{
          width: `min(${SIZE_VH}vh, ${SIZE_VW}vw)`,
          transform: isCenter
            ? "none"
            : isRight
              ? "translateX(50%)"
              : "translateX(-50%)",
        }}
      >
        {mounted && <div className="absolute inset-0">{children}</div>}
      </div>
    </div>
  );
}

/** Mini anel (2 traços) nos nós da timeline — mesmo breakpoint `md` que `useIsMobileLayout`. */
export function ClockCircleNode() {
  const size = 32;
  const cx = size / 2;
  const cy = size / 2;
  const r = 14;
  const tickLen = 1;

  return (
    <svg
      className="absolute inset-0 h-full w-full text-on-surface/35 md:origin-center md:[animation:spin_8s_linear_infinite]"
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden
    >
      {[0, Math.PI].map((angle) => (
        <line
          key={angle}
          x1={cx + r * Math.cos(angle)}
          y1={cy + r * Math.sin(angle)}
          x2={cx + (r + tickLen) * Math.cos(angle)}
          y2={cy + (r + tickLen) * Math.sin(angle)}
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
