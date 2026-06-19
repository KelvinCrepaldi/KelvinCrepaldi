"use client";

import { motion } from "framer-motion";
import { Route } from "lucide-react";

import { useIsMobileLayout } from "@/hooks/useIsMobileLayout";
import { SectionHeader } from "@/_components/_ui/SectionHeader";
import {
  ClockCircleCanvas,
  ClockCircleNode,
  ClockCirclesBackground,
} from "@/_components/_ui/animations/ClockCircles";

const ENTRIES = [
  {
    title: "Desenvolvedor de Software",
    subtitle: "Adam Robo",
    period: "mar. de 2024 — Atual",
    description:
      "Planejamento, arquitetura e desenvolvimento de sistemas web com React, Vite e Electron. Criação de formulários dinâmicos, componentes reutilizáveis e fluxos complexos, reduzindo o tempo de preenchimento para poucos segundos. Suporte técnico em integrações com APIs internas e sistemas offline-first. Atuação direta na definição técnica e estrutural das aplicações, incluindo organização de múltiplos módulos e tomada de decisões críticas. Atendimento simultâneo de mais de 600 clientes sem falhas, com redução de 30% no tempo de carregamento.",
  },
  {
    title: "Desenvolvimento Web Full Stack",
    subtitle: "Kenzie Academy Brasil",
    period: "mai de 2021 — jun. de 2022",
    description:
      "Curso intensivo de 2.000 horas cobrindo tecnologias Front-end e Back-end. Entre as linguagens e ferramentas: HTML5, CSS3, JavaScript (ES6+), React, Redux, Python (Django e Flask) e SQL, além de soft skills para o mercado de trabalho.",
  },
] as const;

export function Timeline() {
  const isMobile = useIsMobileLayout();
  const total = String(ENTRIES.length).padStart(3, "0");

  return (
    <section
      id="timeline"
      className="relative z-10 overflow-hidden bg-surface-container-low px-6 md:px-12 pt-24 pb-36 md:pb-44 border-t border-outline-variant/30"
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
      <div className="relative w-full lg:mx-auto lg:max-w-6xl">
        <SectionHeader
          title="Timeline"
          subtitle="TRAJETÓRIA // experiência profissional e formação ao longo do tempo"
          icon={Route}
          meta={`TOTAL_RECORDS: ${total}`}
        />

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
                    <p className="mb-4 text-body text-on-surface/70">
                      {entry.subtitle}
                      <span className="mx-2">•</span>
                      {entry.period}
                    </p>
                    <p className="text-body text-on-surface/80">
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
