"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  buildRandomGeometricShapeConfigs,
  type GeometricShapeConfig,
} from "@/_utils/geometricBackgroundRandom";
import { useIsMobileLayout } from "@/hooks/useIsMobileLayout";

const NO_BLUR: [string, string, string, string, string] = [
  "none",
  "none",
  "none",
  "none",
  "none",
];

/** Mobile: menos formas, animação mais lenta e cubos mais discretos. */
const MOBILE_SHAPE_COUNT = 3;
const MOBILE_OPACITY_FACTOR = 0.7;
const MOBILE_DURATION_SCALE = 1.55;
const MOBILE_DELAY_EXTRA = 0.85;

function GeometricShape({
  index,
  config,
  lightweight,
}: {
  index: number;
  config: GeometricShapeConfig;
  lightweight: boolean;
}) {
  const filterKeyframes = lightweight ? NO_BLUR : config.blurPx;

  const opacityKeyframes = lightweight
    ? config.opacity.map((o) => o * MOBILE_OPACITY_FACTOR)
    : config.opacity;

  const drift = {
    x: config.driftX,
    y: config.driftY,
    rotate: config.rotate,
    opacity: opacityKeyframes,
    filter: filterKeyframes,
    borderRadius: config.borderRadius,
    ...(config.scale ? { scale: config.scale } : {}),
  };

  const loopDuration = lightweight
    ? config.duration * MOBILE_DURATION_SCALE
    : config.duration;
  const loopDelay = lightweight
    ? config.delay + MOBILE_DELAY_EXTRA
    : config.delay;

  const inner = (
    <motion.div
      className={
        lightweight
          ? "will-change-transform box-border bg-primary/[0.12] shadow-[0_0_0_1px_rgba(54,51,34,0.06)]"
          : "will-change-[transform,filter] box-border bg-primary/[0.16] shadow-[0_0_0_1px_rgba(54,51,34,0.08)]"
      }
      style={{
        width: config.size,
        height: config.size,
        borderWidth: config.borderPx,
        borderStyle: "solid",
        borderColor: lightweight
          ? "rgba(54, 51, 34, 0.38)"
          : "rgba(54, 51, 34, 0.48)",
      }}
      initial={false}
      animate={drift}
      transition={{
        duration: loopDuration,
        delay: loopDelay,
        repeat: Infinity,
        repeatType: "loop",
        ease: config.ease,
        times: config.times,
      }}
    />
  );

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${config.leftPct}%`, top: `${config.topPct}%` }}
      data-shape-index={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: lightweight ? 0.5 : 0.4,
        delay: lightweight ? index * 0.45 : index * 0.3,
        ease: "easeOut",
      }}
    >
      {inner}
    </motion.div>
  );
}

export function AnimatedGeometricBackground() {
  const isMobile = useIsMobileLayout();
  const [configs, setConfigs] = useState<GeometricShapeConfig[] | null>(null);

  useEffect(() => {
    setConfigs(buildRandomGeometricShapeConfigs());
  }, []);

  const visible = configs
    ? isMobile
      ? configs.slice(0, MOBILE_SHAPE_COUNT)
      : configs
    : [];

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-surface" />
      {visible.map((config, index) => (
        <GeometricShape
          key={index}
          index={index}
          config={config}
          lightweight={isMobile}
        />
      ))}
    </div>
  );
}
