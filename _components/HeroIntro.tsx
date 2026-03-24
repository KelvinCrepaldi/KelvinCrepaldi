"use client";

import { Code, Download, Link2 } from "lucide-react";

import { AnimatedIconLink } from "./_ui/AnimatedIconLink";
import { AnimatedPrimaryButton } from "./_ui/AnimatedPrimaryButton";
import { BlinkingDotRow } from "./_ui/BlinkingDotRow";
import { StatusDot } from "./_ui/StatusDot";

export function HeroIntro() {
  return (
    <div className="md:col-span-8 flex flex-col justify-center">
      <div className="mb-4 inline-flex items-center gap-3">
        <StatusDot />
        <BlinkingDotRow count={3} className="opacity-80" size="sm" />
        <span className="text-xs font-bold uppercase tracking-[0.3em] opacity-60">
          SYSTEM_OPERATOR: ACTIVE
        </span>
      </div>
      <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none text-on-surface mb-4">
        Kelvin
        <br />
        Crepaldi
      </h1>
      <h2 className="text-2xl md:text-4xl font-light italic text-on-surface opacity-80 mb-12">
        Front-end Developer
      </h2>
      <div className="flex flex-wrap gap-4 mb-12">
        <AnimatedPrimaryButton href="#" icon={Download}>
          Download Resume
        </AnimatedPrimaryButton>
        <div className="flex items-center gap-4">
          <AnimatedIconLink href="#" aria-label="Link portfolio" icon={Link2} />
          <AnimatedIconLink href="#" aria-label="Código e repositórios" icon={Code} />
        </div>
      </div>
    </div>
  );
}
