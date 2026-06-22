"use client";

import { Wrench } from "lucide-react";

import { SectionHeader } from "@/_components/_ui/SectionHeader";

import { SkillsCategory } from "./skills-category";
import { SKILL_CATEGORIES } from "./skills-tech-data";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative z-10 border-t border-outline-variant/30 bg-surface-container-low/92 px-6 pt-16 pb-28 sm:pt-20 sm:pb-32 md:px-12 md:pt-24 md:pb-44"
    >
      <div className="w-full lg:mx-auto lg:max-w-content">
        <SectionHeader
          title="Habilidades"
          subtitle="STACK // tecnologias, ferramentas e habilidades do dia a dia"
          icon={Wrench}
        />

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
