"use client";

import { useState } from "react";

import { SkillChip } from "./skill-chip";
import { SkillsCategoryBoot } from "./skills-category-boot";
import type { SkillCategory } from "./skills-tech-data";

type SkillsCategoryProps = {
  category: SkillCategory;
  index?: number;
};

export function SkillsCategory({
  category,
  index = 0,
}: SkillsCategoryProps) {
  const [mounted, setMounted] = useState(false);
  const isLast = index === 4;
  const isRightCol = index % 2 === 1 && !isLast;

  return (
    <section
      className={[
        "px-4 py-4 sm:px-5 sm:py-5",
        index > 0 ? "border-t border-outline-variant/30" : "",
        /* first desktop row: right cell must not inherit mobile top border */
        index === 1 ? "md:border-t-0" : "",
        isRightCol ? "md:border-l md:border-outline-variant/30" : "",
        isLast ? "md:col-span-2" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <p className="min-w-0 font-mono text-[11px] font-bold uppercase tracking-widest text-terminal-accent/85 sm:text-xs">
          [{category.code}] {category.title}
        </p>
        <SkillsCategoryBoot
          durationSec={0.25}
          onComplete={() => setMounted(true)}
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {category.kind === "tech"
          ? category.items.map((tech, i) => (
              <SkillChip
                key={tech.name}
                label={tech.name}
                icon={tech.icon}
                index={i}
                visible={mounted}
              />
            ))
          : category.items.map((item, i) => (
              <SkillChip
                key={item}
                label={item}
                index={i}
                visible={mounted}
              />
            ))}
      </div>
    </section>
  );
}
