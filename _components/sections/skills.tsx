"use client";

import { LayoutGrid } from "lucide-react";

import { BlinkingDotRow } from "@/_components/_ui/animations/BlinkingDotRow";

import { SkillsCategory } from "./skills-category";
import { SKILL_CATEGORIES } from "./skills-tech-data";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative z-10 border-t border-outline-variant/30 bg-surface-container-low/92 px-6 pt-16 pb-28 sm:pt-20 sm:pb-32 md:px-12 md:pt-24 md:pb-44"
    >
      <div className="w-full lg:mx-auto lg:max-w-6xl">
        <header className="relative z-10 mb-12 flex flex-col items-end justify-between gap-4 sm:mb-14 md:mb-16 md:flex-row">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <BlinkingDotRow count={4} size="sm" className="mb-1" />
              <h3 className="text-2xl font-black uppercase tracking-tighter text-on-surface sm:text-3xl md:text-4xl">
                Tech_Stack
              </h3>
            </div>
            <p className="mt-2 font-mono text-sm text-on-surface/70">
              STACK // tecnologias, ferramentas e habilidades do dia a dia
            </p>
          </div>
          <div className="mx-8 mb-4 hidden h-px flex-grow bg-outline-variant md:block" />
          <LayoutGrid
            className="h-10 w-10 shrink-0 text-on-surface opacity-20 md:h-12 md:w-12"
            strokeWidth={1.25}
            aria-hidden
          />
        </header>

        <div className="w-full border border-outline-variant/30 bg-surface-container-low">
          {SKILL_CATEGORIES.map((category, index) => (
            <SkillsCategory
              key={category.code}
              category={category}
              isFirst={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
