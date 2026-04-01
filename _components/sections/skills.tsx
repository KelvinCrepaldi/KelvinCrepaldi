"use client";

import { useMemo } from "react";

import { LayoutGrid } from "lucide-react";
import { BlinkingDotRow } from "@/_components/_ui/animations/BlinkingDotRow";
import LoadingAnimation from "../_ui/animations/LoadingOk";

import {
  BACKEND_STACK,
  BANCADA_TOOLS,
  ECOSYSTEM_LIBS,
  FRONT_FRAMEWORKS,
  SOFT_SKILLS,
  type TechWithIcon,
} from "./skills-tech-data";

function StackIcon({
  tech,
  className,
}: {
  tech: TechWithIcon;
  className?: string;
}) {
  const Icon = tech.icon;
  return <Icon className={className} aria-hidden />;
}

const DOTTED_RULE =
  "flex-1 h-px bg-repeat-x opacity-60 [background-image:radial-gradient(circle,rgba(54,51,34,0.40)_1px,transparent_1.5px)] [background-size:6px_2px] [background-position:left_center]";

export function Skills() {
  const soft = SOFT_SKILLS;
  const totalTech = String(
    FRONT_FRAMEWORKS.length +
      BACKEND_STACK.length +
      ECOSYSTEM_LIBS.length +
      BANCADA_TOOLS.length,
  ).padStart(3, "0");

  const durationsByTech = useMemo(() => {
    const map = new Map<string, number>();
    for (const t of ECOSYSTEM_LIBS) map.set(t.name, 2 + (t.name.length % 4));
    return map;
  }, []);

  const durationsBySoft = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of SOFT_SKILLS) map.set(s, 2 + (s.length % 4));
    return map;
  }, []);

  return (
    <section
      id="skills"
      className="relative z-10 px-4 sm:px-6 md:px-12 pt-16 pb-28 sm:pt-20 sm:pb-32 md:pt-24 md:pb-44 bg-surface-container-low/92 border-t border-outline-variant/30"
    >
      <div className="w-full lg:max-w-6xl lg:mx-auto">
        <header className="relative z-10 mb-16 flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <BlinkingDotRow count={4} size="sm" className="mb-1" />
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-on-surface">
                Tech_Stack
              </h3>
            </div>
            <p className="text-sm opacity-60 mt-2 font-mono flex items-center gap-2 flex-wrap">
              <BlinkingDotRow count={3} size="sm" className="opacity-70" />
              TOTAL_RECORDS: {totalTech}
            </p>
          </div>
          <div className="h-px bg-outline-variant flex-grow mx-8 hidden md:block mb-4" />
          <LayoutGrid
            className="w-10 h-10 md:w-12 md:h-12 opacity-20 text-on-surface shrink-0"
            strokeWidth={1.25}
            aria-hidden
          />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border border-outline-variant/30 w-full">
          {/* [01–03] Stack */}
          <section className="md:col-span-7 p-5 sm:p-6 md:p-8 border-b md:border-b-0 md:border-r border-outline-variant/30 bg-surface-container-low">
            <div className="space-y-10 sm:space-y-12">
              {/* [01] Front-end */}
              <div>
                <div className="flex justify-between items-start mb-6 sm:mb-8 md:mb-10 gap-4 sm:gap-6 flex-wrap">
                  <div>
                    <p className="font-mono text-sm font-bold uppercase tracking-widest text-secondary mb-1">
                      [01] INTERFACE_&_FRAMEWORKS
                    </p>
                    <span className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight text-on-surface">
                      Stack de front-end
                    </span>
                  </div>
                  <span className="font-mono text-[10px] opacity-40 text-on-surface">
                    CAMADA: FRONTEND
                  </span>
                </div>

                <ul className="grid grid-cols-1 gap-y-3">
                  {FRONT_FRAMEWORKS.map((tech, index) => (
                    <li
                      key={tech.name}
                      className="group flex min-w-0 items-center gap-3 border-l-2 border-on-surface/20 py-1 pl-3 transition-colors hover:border-on-surface"
                    >
                      <StackIcon
                        tech={tech}
                        className="size-4 shrink-0 text-on-surface opacity-85"
                      />
                      <span className="shrink-0 font-mono text-[11px] text-on-surface opacity-80">
                        {tech.name}
                      </span>
                      <span className={DOTTED_RULE} aria-hidden />
                      <LoadingAnimation durationSec={2 + index * 0.35} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* [02] Backend */}
              <div className="pt-10 border-t border-outline-variant/20">
                <div className="flex justify-between items-start mb-6 sm:mb-8 md:mb-10 gap-4 sm:gap-6 flex-wrap">
                  <div>
                    <p className="font-mono text-sm font-bold uppercase tracking-widest text-secondary mb-1">
                      [02] RUNTIME_&_DADOS
                    </p>
                    <span className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight text-on-surface">
                      Servidor, APIs e persistência
                    </span>
                  </div>
                  <span className="font-mono text-[10px] opacity-40 text-on-surface">
                    CAMADA: BACKEND
                  </span>
                </div>

                <ul className="grid grid-cols-1 gap-y-3">
                  {BACKEND_STACK.map((tech, index) => (
                    <li
                      key={tech.name}
                      className="group flex min-w-0 items-center gap-3 border-l-2 border-on-surface/20 py-1 pl-3 transition-colors hover:border-on-surface"
                    >
                      <StackIcon
                        tech={tech}
                        className="size-4 shrink-0 text-on-surface opacity-85"
                      />
                      <span className="shrink-0 font-mono text-[11px] text-on-surface opacity-80">
                        {tech.name}
                      </span>
                      <span className={DOTTED_RULE} aria-hidden />
                      <LoadingAnimation durationSec={2 + index * 0.35} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* [03] Ecossistema */}
              <div className="pt-10 border-t border-outline-variant/20">
                <div className="mb-8 sm:mb-10">
                  <p className="font-mono text-sm font-bold uppercase tracking-widest text-secondary mb-1">
                    [03] ECOSISTEMA_&_BIBLIOTECAS
                  </p>
                  <span className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight text-on-surface">
                    Libs, estado, UI e fundação web
                  </span>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {ECOSYSTEM_LIBS.map((tech) => (
                    <li key={tech.name} className="flex items-center gap-3">
                      <StackIcon
                        tech={tech}
                        className="size-4 shrink-0 text-on-surface opacity-85"
                      />
                      <span className="font-mono text-[11px] opacity-80 text-on-surface">
                        {tech.name}
                      </span>
                      <span className={DOTTED_RULE} aria-hidden />
                      <LoadingAnimation
                        durationSec={durationsByTech.get(tech.name) ?? 3}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Coluna direita: [04] acima de [05] */}
          <section className="md:col-span-5 p-5 sm:p-6 md:p-8 bg-surface border-b md:border-b-0 border-outline-variant/30">
            <div className="pb-10 border-b border-outline-variant/20">
              <div className="mb-8 sm:mb-10">
                <p className="font-mono text-sm font-bold uppercase tracking-widest text-secondary mb-1">
                  [04] BANCADA_DE_TRABALHO
                </p>
                <span className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight text-on-surface">
                  Ferramentas &amp; Utilitários
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {BANCADA_TOOLS.map((tech) => (
                  <div
                    key={tech.name}
                    className="group flex flex-row items-start gap-2 border border-outline-variant/30 bg-surface-container-low/90 px-2.5 py-2.5 border-l-2 border-l-on-surface/25 hover:border-l-on-surface hover:bg-surface-container-low transition-colors"
                  >
                    <StackIcon
                      tech={tech}
                      className="size-5 shrink-0 text-on-surface mt-0.5 opacity-90"
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-tight text-on-surface leading-tight">
                        {tech.name}
                      </span>
                      <span className="font-mono text-[8px] text-on-surface/35 uppercase tracking-wider">
                        [OPERATOR - TOOLKIT]
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8 sm:mb-10">
              <p className="font-mono text-sm font-bold uppercase tracking-widest text-secondary mb-1">
                [05] PROTOCOLOS_OPERACIONAIS
              </p>
              <span className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight text-on-surface">
                Metodologias &amp; Soft Skills
              </span>
            </div>

            <ul className="grid grid-cols-1 gap-y-2">
              {soft.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="font-mono text-[11px] opacity-80 text-on-surface shrink-0">
                    {item}
                  </span>
                  <span
                    className="flex-1 h-px bg-repeat-x opacity-60 [background-image:radial-gradient(circle,rgba(54,51,34,0.40)_1px,transparent_1.5px)] [background-size:6px_2px] [background-position:left_center]"
                    aria-hidden
                  />
                  <LoadingAnimation
                    durationSec={durationsBySoft.get(item) ?? 3}
                  />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
