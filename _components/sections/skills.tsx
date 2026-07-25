"use client";

import { SectionHeader } from "@/_components/_ui/SectionHeader";

import { SkillsCategory } from "./skills-category";
import { SKILL_CATEGORIES } from "./skills-tech-data";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative z-10 border-t border-outline-variant/30 bg-surface-container-low/92 px-6 py-14 sm:py-16 md:px-12 md:py-20"
    >
      <div className="w-full lg:mx-auto lg:max-w-content">
        <SectionHeader
          title="Habilidades"
          subtitle="tecnologias, ferramentas e habilidades do dia a dia"
          className="!mb-8 md:!mb-10"
        />

        <div className="grid w-full grid-cols-1 border border-outline-variant/30 bg-surface-container-low md:grid-cols-2">
          {SKILL_CATEGORIES.map((category, index) => (
            <SkillsCategory
              key={category.code}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
