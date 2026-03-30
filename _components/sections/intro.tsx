"use client";

import { Github, Linkedin, MapPin } from "lucide-react";

import { AnimatedIconLink } from "@/_components/_ui/animations/AnimatedIconLink";
import { BlinkingDotRow } from "@/_components/_ui/animations/BlinkingDotRow";
import { StatusDot } from "@/_components/_ui/animations/StatusDot";

export function Intro() {
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
      <h2 className="text-2xl md:text-4xl font-light italic text-on-surface opacity-80 mb-4">
        Desenvolvedor Front-end React / JavaScript
      </h2>
      <p className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-on-surface/50 mb-12">
        <MapPin className="w-3 h-3" strokeWidth={2} />
        Curitiba, Brasil
      </p>
      <div className="flex flex-wrap items-center gap-4 mb-12">
        <div className="flex items-center gap-3">
          <AnimatedIconLink
            href="https://github.com/KelvinCrepaldi"
            aria-label="GitHub"
            icon={Github}
          />
          <AnimatedIconLink
            href="https://www.linkedin.com/in/kelvincrepaldi/"
            aria-label="LinkedIn"
            icon={Linkedin}
          />
        </div>
      </div>
    </div>
  );
}
