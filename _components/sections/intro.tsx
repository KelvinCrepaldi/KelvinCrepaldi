"use client";

import { motion } from "framer-motion";
import { Download, Github, Linkedin, MapPin } from "lucide-react";

import { AnimatedIconLink } from "@/_components/_ui/animations/AnimatedIconLink";
import { StatusDot } from "@/_components/_ui/animations/StatusDot";

const CV_HREF = "/Kelvin_Crepaldi_CV.pdf";

export function Intro() {
  return (
    <div className="md:col-span-8 flex flex-col justify-center">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-on-surface mb-4">
        Kelvin
        <br />
        Crepaldi
      </h1>
      <h2 className="text-2xl md:text-4xl font-light italic text-on-surface opacity-80 mb-4">
        Full Stack Developer <StatusDot />
      </h2>
      <p className="max-w-xl text-sm md:text-base leading-relaxed text-on-surface/75 mb-6">
        Desenvolvedor de aplicações web e desktop, do planejamento à entrega —
        interface, APIs, banco de dados e infraestrutura. Foco em consistência,
        performance e manutenção a longo prazo.
      </p>
      <p className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-on-surface/70 mb-12">
        <motion.span
          aria-hidden
          className="inline-flex text-terminal-accent"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <MapPin className="w-3 h-3" strokeWidth={2} />
        </motion.span>
        Curitiba, Brasil
      </p>
      <div className="flex flex-wrap items-center gap-4 mb-12">
        <div className="flex items-center gap-3">
          <AnimatedIconLink
            href="https://github.com/KelvinCrepaldi"
            aria-label="GitHub"
            icon={Github}
          />
          <AnimatedIconLink
            href="https://www.linkedin.com/in/kelvincrepaldi/"
            aria-label="LinkedIn"
            icon={Linkedin}
          />
          <AnimatedIconLink
            href={CV_HREF}
            download="Kelvin_Crepaldi_CV.pdf"
            aria-label="Baixar Curriculum Vitae"
            icon={Download}
          >
            Curriculum Vitae
          </AnimatedIconLink>
        </div>
      </div>
    </div>
  );
}
