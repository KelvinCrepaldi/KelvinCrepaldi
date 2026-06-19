"use client";

import { AnimatedChevronStack } from "@/_components/_ui/animations/AnimatedChevronStack";

type ScrollDownIndicatorProps = {
  className?: string;
};

export function ScrollDownIndicator({ className = "" }: ScrollDownIndicatorProps) {
  return <AnimatedChevronStack direction="down" className={className} />;
}
