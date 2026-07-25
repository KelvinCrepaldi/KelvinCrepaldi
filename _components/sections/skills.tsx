"use client";

import { useTranslations } from "@/_components/i18n/locale-provider";
import { SectionHeader } from "@/_components/_ui/SectionHeader";

import { SkillsCategory } from "./skills-category";
import {
  BANCADA_TOOLS,
  BACKEND_STACK,
  ECOSYSTEM_LIBS,
  FRONT_FRAMEWORKS,
  type SkillCategory,
  type SkillCategoryCode,
} from "./skills-tech-data";

export function Skills() {
  const t = useTranslations();

  const categories: SkillCategory[] = (
    Object.keys(t.skills.categories) as SkillCategoryCode[]
  ).map((code) => {
    const meta = t.skills.categories[code];
    if (code === "05") {
      return {
        code,
        title: meta.title,
        subtitle: meta.subtitle,
        kind: "soft" as const,
        items: t.skills.softSkills,
      };
    }
    const items =
      code === "01"
        ? FRONT_FRAMEWORKS
        : code === "02"
          ? BACKEND_STACK
          : code === "03"
            ? ECOSYSTEM_LIBS
            : BANCADA_TOOLS;
    return {
      code,
      title: meta.title,
      subtitle: meta.subtitle,
      kind: "tech" as const,
      items,
    };
  });

  return (
    <section
      id="skills"
      className="relative z-10 border-t border-outline-variant/30 bg-surface-container-low/92 px-6 py-14 sm:py-16 md:px-12 md:py-20"
    >
      <div className="w-full lg:mx-auto lg:max-w-content">
        <SectionHeader
          title={t.skills.title}
          subtitle={t.skills.subtitle}
          className="!mb-8 md:!mb-10"
        />

        <div className="grid w-full grid-cols-1 border border-outline-variant/30 bg-surface-container-low md:grid-cols-2">
          {categories.map((category, index) => (
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
