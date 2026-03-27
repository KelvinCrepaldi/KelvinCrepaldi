"use client";

import { motion } from "framer-motion";

import { BlinkingDotRow } from "./_ui/BlinkingDotRow";

const COLUMNS = [
  {
    header: "COMPETÊNCIAS_TÉCNICAS",
    items: [
      "React",
      "Next.js",
      "Electron",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Styled Components",
      "Redux",
      "Context API",
      "React Query",
      "Socket.io",
      "i18n",
      "HTML",
      "CSS",
    ],
  },
  {
    header: "FERRAMENTAS",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "Docker",
      "Postman",
      "DBeaver",
      "Notion",
      "Trello",
      "Linux",
      "Windows",
    ],
  },
  {
    header: "METODOLOGIAS_&_SOFT",
    items: [
      "Scrum",
      "Kanban",
      "Comunicação",
      "Proatividade",
      "Liderança",
      "Coordenação de equipe",
      "Mentoria",
      "Planejamento",
      "Adaptabilidade",
    ],
  },
] as const;

function SkillColumn({
  header,
  items,
  colIndex,
}: {
  header: string;
  items: readonly string[];
  colIndex: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: colIndex * 0.12 }}
    >
      <p className="text-[10px] font-bold tracking-[0.4em] text-outline mb-5 flex items-center gap-2 flex-wrap">
        <BlinkingDotRow count={2} size="sm" />
        {header}
      </p>
      <ul className="grid grid-cols-1 gap-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-sm text-on-surface/85 group"
          >
            <span
              className="w-1 h-1 bg-on-surface/30 shrink-0"
              aria-hidden
            />
            <span className="group-hover:translate-x-1 transition-transform">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative z-10 px-6 md:px-12 py-24 bg-surface-container-low/92 backdrop-blur-sm border-t border-outline-variant/30"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-16 flex-wrap">
          <BlinkingDotRow count={4} size="sm" className="mb-1" />
          <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-on-surface">
            Skills_&_Tools
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {COLUMNS.map((col, i) => (
            <SkillColumn
              key={col.header}
              header={col.header}
              items={col.items}
              colIndex={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
