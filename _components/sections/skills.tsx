"use client";

import { useMemo } from "react";

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
import { SystemLogFeed, type SystemLogFeedEntry } from "./system-log-feed";

const OPERATOR_LOG_ENTRIES: SystemLogFeedEntry[] = [
  {
    status: "INFO",
    time: "08:12:03",
    message:
      "totem-platform · Dashboard/API sync: offline-first cache habilitado; atualização aplicada",
  },
  {
    status: "OK",
    time: "08:12:11",
    message:
      "totem-platform · Supabase Storage: builds e configs sincronizados; RLS OK",
  },
  {
    status: "INFO",
    time: "08:12:18",
    message:
      "terminal-core · Indexação: checkpoint salvo; workers avançando com backpressure controlado",
  },
  {
    status: "SYNC",
    time: "08:12:26",
    message:
      "nexus-api · Ingestão assíncrona: idempotência preservada; duplicatas descartadas",
  },
  {
    status: "OK",
    time: "08:12:33",
    message:
      "void-gallery · Render progressivo: assets arquivados com qualidade; orçamento de GPU preservado",
  },
  {
    status: "INFO",
    time: "08:12:41",
    message: "nexus-api · Gateway admin: healthcheck OK; filas sob controle",
  },
  {
    status: "WARN",
    time: "08:12:48",
    message:
      "nexus-api · Backpressure: storage degradado; reprocessamento seguro iniciado",
  },
  {
    status: "OK",
    time: "08:12:55",
    message:
      "totem-platform · Métricas: fila estável; GC de caches obsoletos executado com sucesso",
  },
  {
    status: "INFO",
    time: "08:13:02",
    message:
      "terminal-core · Health: latência p95 dentro do alvo; checkpoints consistentes",
  },
  {
    status: "OK",
    time: "08:13:09",
    message:
      "electron/main · Shell: single-instance lock ativo; IPC respondeu OK",
  },
];

const STATUS_BADGE = {
  compiled: "[COMPILED]",
  stable: "[STABLE]",
} as const;

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

function FeaturedStatusLabels() {
  return (
    <>
      <span className="font-mono text-[9px] font-bold uppercase text-on-surface/50 tabular-nums">
        {STATUS_BADGE.compiled}
      </span>
      <span className="font-mono text-[9px] font-bold uppercase text-on-surface/50 tabular-nums">
        {STATUS_BADGE.stable}
      </span>
    </>
  );
}

export function Skills() {
  const soft = SOFT_SKILLS;

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
          {/* [01–03] Stack */}
          <section className="md:col-span-7 p-5 sm:p-6 md:p-8 border-b md:border-b-0 md:border-r border-outline-variant/30 bg-surface-container-low">
            <div className="space-y-10 sm:space-y-12">
              {/* [01] Front-end */}
              <div>
                <div className="flex justify-between items-start mb-8 sm:mb-10 md:mb-12 gap-4 sm:gap-6 flex-wrap">
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

                <div className="space-y-6">
                  {FRONT_FRAMEWORKS.map((tech, index) => (
                    <div
                      key={tech.name}
                      className="group border-l-2 border-on-surface/20 pl-4 py-1 hover:border-on-surface transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                        <span className="text-lg sm:text-xl font-bold uppercase tracking-tight text-on-surface min-w-0">
                          {tech.name}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          <LoadingAnimation durationSec={2 + index * 0.35} />
                          <FeaturedStatusLabels />
                          <StackIcon
                            tech={tech}
                            className="size-3.5 shrink-0 text-on-surface/45"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* [02] Backend */}
              <div className="pt-10 border-t border-outline-variant/20">
                <div className="flex justify-between items-start mb-8 sm:mb-10 md:mb-12 gap-4 sm:gap-6 flex-wrap">
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

                <div className="space-y-6">
                  {BACKEND_STACK.map((tech, index) => (
                    <div
                      key={tech.name}
                      className="group border-l-2 border-on-surface/20 pl-4 py-1 hover:border-on-surface transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                        <span className="text-lg sm:text-xl font-bold uppercase tracking-tight text-on-surface min-w-0">
                          {tech.name}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          <LoadingAnimation durationSec={2 + index * 0.35} />
                          <FeaturedStatusLabels />
                          <StackIcon
                            tech={tech}
                            className="size-3.5 shrink-0 text-on-surface/45"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                      <span
                        className="flex-1 h-px bg-repeat-x opacity-60 [background-image:radial-gradient(circle,rgba(54,51,34,0.40)_1px,transparent_1.5px)] [background-size:6px_2px] [background-position:left_center]"
                        aria-hidden
                      />
                      <LoadingAnimation
                        durationSec={durationsByTech.get(tech.name) ?? 3}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Coluna direita: faixa preta + [04] */}
          <div className="md:col-span-5 flex flex-col md:h-full min-h-0 border-b md:border-b-0">
            <div className="shrink-0 bg-surface-container-low/92 px-5 sm:px-6 md:px-8 py-5 sm:py-6 border-b border-outline-variant/30">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-0 md:mb-3">
                <p className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary/90">
                  [00] CANAL_OPERADOR
                </p>
                <BlinkingDotRow
                  count={3}
                  size="sm"
                  className="opacity-70 [&>span]:bg-emerald-400"
                />
              </div>
              <SystemLogFeed
                entries={OPERATOR_LOG_ENTRIES}
                maxVisible={4}
                baseIntervalMs={650}
                lengthFactorMs={8}
                tone="default"
              />
            </div>

            <section className="flex-1 flex flex-col min-h-0 p-5 sm:p-6 md:p-8 bg-surface md:border-b-0 border-b border-outline-variant/30">
              <div className="mb-8 sm:mb-10 shrink-0">
                <p className="font-mono text-sm font-bold uppercase tracking-widest text-secondary mb-1">
                  [04] PROTOCOLOS_OPERACIONAIS
                </p>
                <span className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight text-on-surface">
                  Metodologias &amp; Soft Skills
                </span>
              </div>

              <ul className="grid grid-cols-1 gap-y-2 flex-1 content-start w-full max-w-[18rem]">
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

          {/* [05] Bancada */}
          <section className="md:col-span-12 p-5 sm:p-6 md:p-8 border-t border-outline-variant/30 bg-surface-container">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 sm:mb-10 gap-4">
              <div>
                <p className="font-mono text-sm font-bold uppercase tracking-widest text-secondary mb-1">
                  [05] BANCADA_DE_TRABALHO
                </p>
                <span className="text-lg sm:text-xl font-bold uppercase tracking-tight text-on-surface">
                  Ferramentas &amp; Utilitários
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="font-mono text-[10px] border border-on-surface px-2 py-0.5 font-bold text-secondary uppercase">
                  OS: LINUX/WIN
                </span>
                <span className="font-mono text-[10px] bg-on-surface text-surface px-2 py-0.5 font-bold uppercase">
                  ENV: PRODUCTION_READY
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
              {BANCADA_TOOLS.map((tech) => (
                <div
                  key={tech.name}
                  className="group flex flex-row items-start gap-2.5 border border-outline-variant/30 bg-surface-container-low/90 pl-3 pr-3 py-3 border-l-2 border-l-on-surface/25 hover:border-l-on-surface hover:bg-surface-container-low transition-colors"
                >
                  <StackIcon
                    tech={tech}
                    className="size-5 shrink-0 text-on-surface mt-0.5 opacity-90"
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-tight text-on-surface leading-tight">
                      {tech.name}
                    </span>
                    <span className="font-mono text-[9px] text-secondary/90 uppercase tracking-wider">
                      bancada · util
                    </span>
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
