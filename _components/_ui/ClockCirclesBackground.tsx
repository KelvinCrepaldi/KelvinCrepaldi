"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ─── Configuração ───────────────────────────────────────────────────── */

/** Tamanho do círculo: min(vh, vw) */
const SIZE_VH = "90";
const SIZE_VW = "90";

/**
 * Cada círculo: tickCount, radius, tickLength, opacity.
 * mode: "linear" = giro contínuo | "random" = passos aleatórios.
 *
 * Linear: duration (segundos por volta), direction (-1 ou 1).
 * Random: delay (segundos entre passos), degrees (±graus), speed (segundos para chegar ao grau).
 */
const CIRCLES = [
  {
    radius: 180,
    tickCount: 200,
    tickLength: 8,
    opacity: 0.1,
    mode: "random" as const,
    delay: 5,
    degrees: 72,
    speed: 4.5,
  },
  {
    radius: 123,
    tickCount: 48,
    tickLength: 8,
    opacity: 0.1,
    mode: "random" as const,
    delay: 3,
    degrees: 72,
    speed: 2.5,
  },
  {
    radius: 115,
    tickCount: 200,
    tickLength: 5,
    opacity: 0.09,
    mode: "linear" as const,
    duration: 300,
    direction: -1 as -1 | 1,
  },
] as const;

/* ─── Cálculos derivados ─────────────────────────────────────────────── */
const CX = 200;
const CY = 200;

function radialTicks(
  radius: number,
  tickLen: number,
  count: number,
): { x1: number; y1: number; x2: number; y2: number }[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (2 * Math.PI * i) / count;
    return {
      x1: CX + radius * Math.cos(angle),
      y1: CY + radius * Math.sin(angle),
      x2: CX + (radius + tickLen) * Math.cos(angle),
      y2: CY + (radius + tickLen) * Math.sin(angle),
    };
  });
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

const circleData = CIRCLES.map((c) => ({
  ...c,
  ticks: radialTicks(c.radius, c.tickLength, c.tickCount),
}));

function CircleLayer({
  circle,
  circleIdx,
}: {
  circle: (typeof circleData)[number];
  circleIdx: number;
}) {
  if (circle.mode === "linear") {
    return (
      <motion.g
        style={{ transformOrigin: "200px 200px" }}
        animate={{ rotate: 360 * circle.direction }}
        transition={{
          duration: circle.duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {circle.ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke={`rgba(54, 51, 34, ${circle.opacity})`}
            strokeWidth={circleIdx === 0 ? 1.5 : 1}
            strokeLinecap="round"
          />
        ))}
      </motion.g>
    );
  }

  // random
  const [rotation, setRotation] = useState(0);
  const { delay, degrees, speed } = circle;

  useEffect(() => {
    const id = setInterval(() => {
      setRotation((r) => r + randomBetween(-degrees, degrees));
    }, delay * 1000);
    return () => clearInterval(id);
  }, [delay, degrees]);

  return (
    <motion.g
      style={{ transformOrigin: "200px 200px" }}
      animate={{ rotate: rotation }}
      transition={{
        duration: speed,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {circle.ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke={`rgba(54, 51, 34, ${circle.opacity})`}
          strokeWidth={circleIdx === 0 ? 1.5 : 1}
          strokeLinecap="round"
        />
      ))}
    </motion.g>
  );
}

type Position = "left" | "right" | "center";

/** Versão mini do círculo com 2 traços, para os nós da timeline */
export function ClockCircleNode() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const size = 32;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 14;
  const tickLen = 1;
  const ticks = [
    { angle: 0 },
    { angle: Math.PI },
  ].map(({ angle }) => ({
    x1: cx + radius * Math.cos(angle),
    y1: cy + radius * Math.sin(angle),
    x2: cx + (radius + tickLen) * Math.cos(angle),
    y2: cy + (radius + tickLen) * Math.sin(angle),
  }));

  if (!mounted) return null;

  return (
    <motion.svg
      className="absolute inset-0 w-full h-full"
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      style={{ transformOrigin: "center center" }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke="rgba(54, 51, 34, 0.35)"
          strokeWidth={1}
          strokeLinecap="round"
        />
      ))}
    </motion.svg>
  );
}

export function ClockCirclesBackground({ position = "left" }: { position?: Position }) {
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
          transform: isCenter ? "none" : isRight ? "translateX(50%)" : "translateX(-50%)",
        }}
      >
        {mounted && (
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 400"
            fill="none"
          >
            {circleData.map((circle, idx) => (
              <CircleLayer key={idx} circle={circle} circleIdx={idx} />
            ))}
          </svg>
        )}
      </div>
    </div>
  );
}
