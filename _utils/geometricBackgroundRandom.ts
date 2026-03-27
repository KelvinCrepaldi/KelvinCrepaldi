/**
 * Configs do fundo geométrico com Math.random.
 * Só deve ser chamado no cliente (após mount) — evita mismatch SSR/hidratação e garante animação válida.
 */

type CubicEase = [number, number, number, number];

export type GeometricShapeConfig = {
  driftX: number[];
  driftY: number[];
  rotate: number[];
  opacity: number[];
  blurPx: string[];
  borderRadius: string[];
  scale?: number[];
  size: number;
  borderPx: number;
  leftPct: number;
  topPct: number;
  duration: number;
  delay: number;
  ease: CubicEase;
  times?: number[];
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

const EASE_PRESETS: CubicEase[] = [
  [0.83, 0, 0.17, 1],
  [0.87, 0, 0.13, 1],
  [0.42, 0, 0.58, 1],
  [0.65, 0, 0.35, 1],
  [0.22, 1, 0.36, 1],
  [0.7, 0, 0.3, 1],
];

function driftKeyframes(magnitude: number) {
  return [
    0,
    randomBetween(-magnitude, magnitude),
    randomBetween(-magnitude, magnitude),
    randomBetween(-magnitude, magnitude),
    0,
  ];
}

function buildShapeConfig(index: number): GeometricShapeConfig {
  const quadrant = index % 4;
  const leftAnchors = [4, 48, 12, 62];
  const topAnchors = [10, 14, 52, 58];
  const leftPct = Math.min(
    82,
    leftAnchors[quadrant]! + randomBetween(0, 26),
  );
  const topPct = Math.min(
    78,
    topAnchors[quadrant]! + randomBetween(0, 22),
  );

  const driftMag = randomBetween(28, 92);
  const driftX = driftKeyframes(driftMag);
  const driftY = driftKeyframes(driftMag * randomBetween(0.75, 1.15));

  const spinDir = Math.random() > 0.5 ? 1 : -1;
  const rMax = randomBetween(120, 540) * spinDir;
  const rotate = [
    0,
    randomBetween(-90, 90) * spinDir,
    randomBetween(90, 240) * spinDir,
    rMax,
    0,
  ];

  const o0 = randomBetween(0.26, 0.42);
  const o1 = randomBetween(0.48, 0.68);
  const o2 = randomBetween(0.32, 0.52);
  const o3 = randomBetween(0.4, 0.58);
  const opacity = [o0, o1, o2, o3, o0];

  const b0 = randomBetween(0, 1.2);
  const b1 = randomBetween(0.4, 3.8);
  const b2 = randomBetween(0, 2.4);
  const b3 = randomBetween(0.2, 2.2);
  const blurPx = [
    `blur(${b0}px)`,
    `blur(${b1}px)`,
    `blur(${b2}px)`,
    `blur(${b3}px)`,
    `blur(${b0}px)`,
  ];

  const br = () => `${randomBetween(0, 48)}%`;
  const borderRadius = [br(), br(), br(), br(), br()];

  const size = randomBetween(36, 124);
  const borderPx = 1 + Math.floor(Math.random() * 3);
  const duration = randomBetween(9, 26);
  const delay = randomBetween(0, 2.4);
  const ease = EASE_PRESETS[Math.floor(Math.random() * EASE_PRESETS.length)]!;

  const withScale = Math.random() > 0.35;
  const scale = withScale
    ? [
        1,
        randomBetween(0.82, 1.18),
        randomBetween(0.88, 1.12),
        randomBetween(0.9, 1.22),
        1,
      ]
    : undefined;

  const uneven = Math.random() > 0.7;
  const times = uneven
    ? [
        0,
        randomBetween(0.12, 0.28),
        randomBetween(0.35, 0.55),
        randomBetween(0.62, 0.88),
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
  };
}

const SHAPE_COUNT = 7;

export function buildRandomGeometricShapeConfigs(): GeometricShapeConfig[] {
  return Array.from({ length: SHAPE_COUNT }, (_, i) => buildShapeConfig(i));
}
