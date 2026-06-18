"use client";

import { useState } from "react";

import { SkillChip } from "./skill-chip";
import { SkillsCategoryBoot } from "./skills-category-boot";
import type { SkillCategory } from "./skills-tech-data";

type SkillsCategoryProps = {
  category: SkillCategory;
  isFirst?: boolean;
};

export function SkillsCategory({ category, isFirst = false }: SkillsCategoryProps) {
  const [mounted, setMounted] = useState(false);

  return (
    <section
      className={
        isFirst
          ? "px-5 py-8 sm:px-6 sm:py-10 md:px-8"
          : "border-t border-outline-variant/30 px-5 py-8 sm:px-6 sm:py-10 md:px-8"
      }
    >
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3 sm:mb-6">
        <div className="min-w-0">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-terminal-accent/85 sm:text-sm">
            [{category.code}] {category.title}
          </p>
          <p className="mt-1 text-body text-on-surface/55">
            {category.subtitle}
          </p>
        </div>
        <SkillsCategoryBoot onComplete={() => setMounted(true)} />
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-2.5">
        {category.kind === "tech"
          ? category.items.map((tech, index) => (
              <SkillChip
                key={tech.name}
                label={tech.name}
                icon={tech.icon}
                index={index}
                visible={mounted}
              />
            ))
          : category.items.map((item, index) => (
              <SkillChip
                key={item}
                label={item}
                index={index}
                visible={mounted}
              />
            ))}
      </div>
    </section>
  );
}
