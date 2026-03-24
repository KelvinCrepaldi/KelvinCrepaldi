"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

const SHAPE_COUNT = 7;

type CubicEase = [number, number, number, number];

type ShapeConfig = {
  driftX: number[];
  driftY: number[];
  rotate: number[];
  opacity: number[];
  blurPx: string[];
  borderRadius: string[];
  scale?: number[];
  size: number;
  /** 1, 2 ou 3 px */
  borderPx: number;
  leftPct: number;
  topPct: number;
  duration: number;
  delay: number;
  ease: CubicEase;
  times?: number[];
  useParallax: boolean;
  parallaxY: [number, number];
  parallaxX: [number, number];
};

function createRng(seed: number) {
  let a = seed >>> 0;
  return function rand() {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomBetween(rng: () => number, min: number, max: number) {
  return min + rng() * (max - min);
}

function pickEase(rng: () => number): CubicEase {
  const presets: CubicEase[] = [
    [0.83, 0, 0.17, 1],
    [0.87, 0, 0.13, 1],
    [0.42, 0, 0.58, 1],
    [0.65, 0, 0.35, 1],
    [0.22, 1, 0.36, 1],
    [0.7, 0, 0.3, 1],
  ];
  return presets[Math.floor(rng() * presets.length)]!;
}

function driftKeyframes(rng: () => number, magnitude: number) {
  return [
    0,
    randomBetween(rng, -magnitude, magnitude),
    randomBetween(rng, -magnitude, magnitude),
    randomBetween(rng, -magnitude, magnitude),
    0,
  ];
}

function buildShapeConfig(rng: () => number, index: number): ShapeConfig {
  const quadrant = index % 4;
  const leftAnchors = [4, 48, 12, 62];
  const topAnchors = [10, 14, 52, 58];
  const leftPct = Math.min(
    82,
    leftAnchors[quadrant]! + randomBetween(rng, 0, 26),
  );
  const topPct = Math.min(
    78,
    topAnchors[quadrant]! + randomBetween(rng, 0, 22),
  );

  const driftMag = randomBetween(rng, 28, 92);
  const driftX = driftKeyframes(rng, driftMag);
  const driftY = driftKeyframes(rng, driftMag * randomBetween(rng, 0.75, 1.15));

  const spinDir = rng() > 0.5 ? 1 : -1;
  const rMax = randomBetween(rng, 120, 540) * spinDir;
  const rotate = [
    0,
    randomBetween(rng, -90, 90) * spinDir,
    randomBetween(rng, 90, 240) * spinDir,
    rMax,
    0,
  ];

  const o0 = randomBetween(rng, 0.26, 0.42);
  const o1 = randomBetween(rng, 0.48, 0.68);
  const o2 = randomBetween(rng, 0.32, 0.52);
  const o3 = randomBetween(rng, 0.4, 0.58);
  const opacity = [o0, o1, o2, o3, o0];

  const b0 = randomBetween(rng, 0, 1.2);
  const b1 = randomBetween(rng, 0.4, 3.8);
  const b2 = randomBetween(rng, 0, 2.4);
  const b3 = randomBetween(rng, 0.2, 2.2);
  const blurPx = [
    `blur(${b0}px)`,
    `blur(${b1}px)`,
    `blur(${b2}px)`,
    `blur(${b3}px)`,
    `blur(${b0}px)`,
  ];

  const br = () => `${randomBetween(rng, 0, 48)}%`;
  const borderRadius = [br(), br(), br(), br(), br()];

  const size = randomBetween(rng, 36, 124);
  const borderPx = 1 + Math.floor(rng() * 3);
  const duration = randomBetween(rng, 9, 26);
  const delay = randomBetween(rng, 0, 2.4);
  const ease = pickEase(rng);

  const useParallax = rng() > 0.45;
  const py1 = randomBetween(rng, -150, 150);
  const parallaxY: [number, number] = [0, py1];
  const parallaxX: [number, number] = [0, py1 * randomBetween(rng, 0.25, 0.42)];

  const withScale = rng() > 0.35;
  const scale = withScale
    ? [
        1,
        randomBetween(rng, 0.82, 1.18),
        randomBetween(rng, 0.88, 1.12),
        randomBetween(rng, 0.9, 1.22),
        1,
      ]
    : undefined;

  const uneven = rng() > 0.7;
  const times = uneven
    ? [
        0,
        randomBetween(rng, 0.12, 0.28),
        randomBetween(rng, 0.35, 0.55),
        randomBetween(rng, 0.62, 0.88),
        1,
      ]
    : undefined;

  return {
    driftX,
    driftY,
    rotate,
    opacity,
    blurPx,
    borderRadius,
    scale,
    size,
    borderPx,
    leftPct,
    topPct,
    duration,
    delay,
    ease,
    times,
    useParallax,
    parallaxY,
    parallaxX,
  };
}

function GeometricShape({
  index,
  config,
  scrollYProgress,
}: {
  index: number;
  config: ShapeConfig;
  scrollYProgress: MotionValue<number>;
}) {
  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    config.useParallax ? config.parallaxY : [0, 0],
  );
  const xParallax = useTransform(
    scrollYProgress,
    [0, 1],
    config.useParallax ? config.parallaxX : [0, 0],
  );

  const drift = {
    x: config.driftX,
    y: config.driftY,
    rotate: config.rotate,
    opacity: config.opacity,
    filter: config.blurPx,
    borderRadius: config.borderRadius,
    ...(config.scale ? { scale: config.scale } : {}),
  };

  const inner = (
    <motion.div
      className="will-change-[transform,filter] box-border bg-primary/[0.16] shadow-[0_0_0_1px_rgba(54,51,34,0.08)]"
      style={{
        width: config.size,
        height: config.size,
        borderWidth: config.borderPx,
        borderStyle: "solid",
        borderColor: "rgba(54, 51, 34, 0.48)",
      }}
      initial={false}
      animate={drift}
      transition={{
        duration: config.duration,
        delay: config.delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: config.ease,
        times: config.times,
      }}
    />
  );

  return (
    <div
      className="absolute pointer-events-none"
      style={{ left: `${config.leftPct}%`, top: `${config.topPct}%` }}
      data-shape-index={index}
    >
      {config.useParallax ? (
        <motion.div style={{ x: xParallax, y: yParallax }}>{inner}</motion.div>
      ) : (
        inner
      )}
    </div>
  );
}

export function AnimatedGeometricBackground() {
  const { scrollYProgress } = useScroll();
  const [configs, setConfigs] = useState<ShapeConfig[] | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const randomBytes = new Uint32Array(1);
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      crypto.getRandomValues(randomBytes);
    } else {
      randomBytes[0] = Math.floor(Math.random() * 0xffffffff);
    }
    const base = (Date.now() ^ randomBytes[0]) >>> 0;
    setConfigs(
      Array.from({ length: SHAPE_COUNT }, (_, i) => {
        const rng = createRng(base + i * 0x9e3779b1);
        return buildShapeConfig(rng, i);
      }),
    );
  }, [mounted]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-surface" />
      {configs?.map((config, index) => (
        <GeometricShape
          key={index}
          index={index}
          config={config}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}
