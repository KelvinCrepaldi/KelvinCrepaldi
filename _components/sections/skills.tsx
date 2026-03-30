"use client";

import { BlinkingDotRow } from "@/_components/_ui/animations/BlinkingDotRow";

const COLUMNS = [
  {
    header: "COMPETÊNCIAS_TÉCNICAS",
    items: [
      "React",
      "Next.js",
      "Electron",
      "TypeScript",
      "JavaScript",
      "Vite",
      "Node.js",
      "Express",
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

const STATUS_BADGE = {
  compiled: "[COMPILED]",
  stable: "[STABLE]",
  active: "[ATIVO]",
  sync: "[SYNC]",
  root: "[ROOT_ACCESS]",
  uplink: "[UPLINK]",
} as const;

function Badge({
  children,
  variant = "filled",
}: {
  children: string;
  variant?: "filled" | "outline";
}) {
  return (
    <span
      className={
        variant === "filled"
          ? "font-mono text-[10px] bg-on-surface text-surface px-2 py-0.5 font-bold"
          : "font-mono text-[10px] border border-on-surface px-2 py-0.5 font-bold text-secondary"
      }
    >
      {children}
    </span>
  );
}

export function Skills() {
  const competencies = COLUMNS[0].items;
  const tools = COLUMNS[1].items;
  const soft = COLUMNS[2].items;

  const featured = competencies.slice(0, 3);
  const rest = competencies.slice(3);
  const restLeft = rest.slice(0, Math.ceil(rest.length / 2));
  const restRight = rest.slice(Math.ceil(rest.length / 2));
  return (
    <section
      id="skills"
      className="relative z-10 px-4 sm:px-6 md:px-12 py-16 sm:py-20 md:py-24 bg-surface-container-low/92 border-t border-outline-variant/30"
    >
      <div className="w-full">
        <header className="mb-10 sm:mb-12 md:mb-16 border-l-4 border-on-surface pl-4 sm:pl-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-on-surface" aria-hidden />
            <span className="font-mono text-xs uppercase tracking-tighter opacity-60">
              ROOT/INVENTARIO_SISTEMA/HABILIDADES.EXE
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-3 sm:mb-4 text-on-surface">
            Manifesto
            <br />
            Tech_Stack
          </h3>
          <p className="max-w-2xl text-sm sm:text-base md:text-lg opacity-80 leading-relaxed text-on-surface">
            Uma auditoria granular dos protocolos técnicos e ferramentas usadas
            para construção digital de alta performance.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border border-outline-variant/30 w-full">
          {/* [01] Competências técnicas */}
          <section className="md:col-span-7 p-5 sm:p-6 md:p-8 border-b md:border-b-0 md:border-r border-outline-variant/30 bg-surface-container-low">
            <div className="flex justify-between items-start mb-8 sm:mb-10 md:mb-12 gap-4 sm:gap-6 flex-wrap">
              <div>
                <p className="font-mono text-sm font-bold uppercase tracking-widest text-secondary mb-1">
                  [01] COMPETÊNCIAS_TÉCNICAS
                </p>
                <span className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight text-on-surface">
                  Engenharia de Interface
                </span>
              </div>
              <span className="font-mono text-[10px] opacity-40 text-on-surface">
                PRIORIDADE: ALPHA
              </span>
            </div>

            <div className="space-y-6">
              {featured.map((label) => (
                <div
                  key={label}
                  className="group border-l-2 border-on-surface/20 pl-4 py-1 hover:border-on-surface transition-colors"
                >
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <span className="text-lg sm:text-xl font-bold uppercase tracking-tight text-on-surface">
                      {label}
                    </span>
                    <div className="flex gap-2">
                      <Badge>{STATUS_BADGE.compiled}</Badge>
                      <Badge variant="outline">{STATUS_BADGE.stable}</Badge>
                    </div>
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-outline-variant/20">
                {[restLeft, restRight].map((col, colIdx) => (
                  <div key={colIdx} className="space-y-3">
                    {col.map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between group gap-3"
                      >
                        <div className="flex items-center gap-2 font-mono text-xs shrink-0">
                          <Badge>{STATUS_BADGE.compiled}</Badge>
                          <Badge variant="outline">{STATUS_BADGE.stable}</Badge>
                        </div>
                        <span className="font-mono text-[11px] opacity-80 text-on-surface group-hover:opacity-100 transition-opacity text-right">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Coluna direita (soft) */}
          <div className="md:col-span-5">
            <section className="p-5 sm:p-6 md:p-8 bg-surface border-b border-outline-variant/30">
              <div className="flex justify-between items-start mb-6 sm:mb-8 gap-4 sm:gap-6 flex-wrap">
                <div>
                  <p className="font-mono text-sm font-bold uppercase tracking-widest text-secondary mb-1">
                    [02] PROTOCOLOS_OPERACIONAIS
                  </p>
                  <span className="text-lg sm:text-xl font-bold uppercase tracking-tight text-on-surface">
                    Metodologias &amp; Soft Skills
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BlinkingDotRow count={3} size="sm" className="opacity-70" />
                </div>
              </div>

              <ul className="space-y-3">
                {soft.map((item, i) => {
                  const status =
                    i === 0
                      ? STATUS_BADGE.active
                      : i === 1
                        ? STATUS_BADGE.sync
                        : i === 2
                          ? STATUS_BADGE.root
                          : i === 3
                            ? STATUS_BADGE.uplink
                            : STATUS_BADGE.stable;

                  return (
                    <li
                      key={item}
                      className="flex items-center justify-between border-b border-outline-variant/20 pb-2 gap-4"
                    >
                      <span className="font-mono text-[11px] sm:text-xs text-on-surface">
                        {item.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-bold text-secondary uppercase shrink-0">
                        {status}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>

          {/* [03] Ferramentas */}
          <section className="md:col-span-12 p-5 sm:p-6 md:p-8 border-t border-outline-variant/30 bg-surface-container">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 sm:mb-10 gap-4">
              <div>
                <p className="font-mono text-sm font-bold uppercase tracking-widest text-secondary mb-1">
                  [03] BANCADA_DE_TRABALHO
                </p>
                <span className="text-lg sm:text-xl font-bold uppercase tracking-tight text-on-surface">
                  Ferramentas &amp; Utilitários
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-surface border border-outline-variant text-xs font-mono uppercase">
                  OS: LINUX/WIN
                </span>
                <span className="px-3 py-1 bg-surface border border-outline-variant text-xs font-mono uppercase">
                  ENV: PRODUCTION_READY
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
              {tools.map((tool) => (
                <div
                  key={tool}
                  className="p-4 bg-surface-container-lowest border border-outline-variant/20 group hover:bg-on-surface hover:text-surface transition-all"
                >
                  <div className="font-bold text-sm mb-1 uppercase">{tool}</div>
                  <div className="font-mono text-[9px] opacity-60">
                    UTILITARIO
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
