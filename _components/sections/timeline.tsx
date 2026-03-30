"use client";

import { motion } from "framer-motion";

import { useIsMobileLayout } from "@/hooks/useIsMobileLayout";
import { BlinkingDotRow } from "@/_components/_ui/animations/BlinkingDotRow";
import {
  ClockCircleCanvas,
  ClockCircleNode,
  ClockCirclesBackground,
} from "@/_components/_ui/animations/ClockCircles";

const ENTRIES = [
  {
    title: "Desenvolvedor de Software Front-end Júnior",
    subtitle: "Adam Robo",
    period: "Mar 2024 — Atual",
    description:
      "Planejamento, arquitetura e desenvolvimento de sistemas web com React, Vite e Electron. Criação de formulários dinâmicos, componentes reutilizáveis e fluxos complexos, reduzindo o tempo de preenchimento para poucos segundos. Suporte técnico em integrações com APIs internas e sistemas offline-first. Atendimento simultâneo de mais de 600 clientes sem falhas, com redução de 30% no tempo de carregamento.",
  },
  {
    title: "Desenvolvimento Web Full Stack",
    subtitle: "Kenzie Academy Brasil",
    period: "Mai 2021 — Jun 2022",
    description:
      "Curso intensivo de 2.000 horas cobrindo tecnologias Front-end e Back-end. Entre as linguagens e ferramentas: HTML5, CSS3, JavaScript (ES6+), React, Redux, Python (Django e Flask) e SQL, além de soft skills para o mercado de trabalho.",
  },
] as const;

export function Timeline() {
  const isMobile = useIsMobileLayout();

  return (
    <section
      id="timeline"
      className="relative z-10 overflow-hidden bg-surface-container-low px-6 md:px-12 py-24 border-t border-outline-variant/30 md:bg-surface-container-low/92"
    >
      {!isMobile && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-50">
          <ClockCirclesBackground position="center">
            <ClockCircleCanvas
              mode="random"
              radius={180}
              tickCount={200}
              tickLength={8}
              opacity={0.1}
              strokeWidth={1.5}
              delay={5}
              degrees={72}
              speed={4.5}
            />
            <ClockCircleCanvas
              mode="random"
              radius={123}
              tickCount={48}
              tickLength={8}
              opacity={0.1}
              delay={3}
              degrees={72}
              speed={2.5}
            />
            <ClockCircleCanvas
              mode="linear"
              radius={115}
              tickCount={200}
              tickLength={5}
              opacity={0.09}
              duration={300}
              direction={-1}
            />
          </ClockCirclesBackground>
        </div>
      )}
      <div className="max-w-5xl mx-auto relative">
        <div className="flex items-center gap-3 mb-20 flex-wrap">
          <BlinkingDotRow count={4} size="sm" className="mb-1" />
          <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-on-surface">
            Timeline
          </h3>
        </div>

        <div className="relative">
          <div
            className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 bg-outline-variant/50"
            aria-hidden
          />

          <ul className="space-y-20 md:space-y-28">
            {ENTRIES.map((entry, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <motion.li
                  key={entry.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  className={`relative flex items-start gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-row`}
                >
                  <div
                    className={`flex-1 w-full md:max-w-[calc(50%-28px)] pl-10 md:pl-0 md:pr-0 min-w-0 ${
                      isLeft
                        ? "md:pr-12 md:text-right"
                        : "md:pl-12 md:text-left"
                    }`}
                  >
                    <h4 className="text-xl md:text-2xl font-bold tracking-tight text-on-surface mb-2">
                      {entry.title}
                    </h4>
                    <p className="text-sm text-on-surface/70 mb-4">
                      {entry.subtitle}
                      <span className="mx-2">•</span>
                      {entry.period}
                    </p>
                    <p className="text-sm leading-relaxed text-on-surface/80">
                      {entry.description}
                    </p>
                  </div>

                  <div
                    className="absolute left-[15px] md:left-1/2 top-6 w-8 h-8 flex items-center justify-center -translate-x-1/2"
                    aria-hidden
                  >
                    {!isMobile && <ClockCircleNode />}
                    <div
                      className="relative w-5 h-5 flex items-center justify-center p-1 border border-on-surface/50 bg-surface-container-low"
                      style={{ borderRadius: "50%" }}
                    >
                      <motion.span
                        className="w-1.5 h-1.5 bg-on-surface"
                        style={{ borderRadius: "50%" }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    className="hidden md:block flex-1 max-w-[calc(50%-28px)]"
                    aria-hidden
                  />
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
