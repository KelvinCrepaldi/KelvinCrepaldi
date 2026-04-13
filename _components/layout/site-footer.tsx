"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

const iconLink =
  "flex items-center justify-center w-10 h-10 rounded-none border border-[#fef9ed]/25 text-[#fef9ed]/80 hover:text-white hover:border-[#fef9ed]/60";

const GITHUB_URL = "https://github.com/KelvinCrepaldi";
const LINKEDIN_URL = "https://www.linkedin.com/in/kelvincrepaldi/";
const EMAIL = "kelvin.crepaldi@hotmail.com";
const WHATSAPP = "5541996748781";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="relative z-10 bg-footer-surface text-[#fef9ed] w-full px-6 sm:px-8 md:px-12 pt-16 pb-24 md:pt-24 md:pb-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-[#fef9ed]/60">
              CONTACT_PROTOCOL // OPEN_CHANNEL
            </p>
            <p className="mt-3 text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#fef9ed]">
              Vamos conversar
            </p>
            <p className="mt-2 max-w-xl text-sm text-[#fef9ed]/70">
              Se você tiver um projeto, uma vaga ou só quiser trocar ideia sobre
              produto e engenharia, me chama.
            </p>
          </div>

          <div className="flex gap-3">
            <motion.a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={iconLink}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Github className="w-4 h-4" strokeWidth={2} />
            </motion.a>
            <motion.a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={iconLink}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Linkedin className="w-4 h-4" strokeWidth={2} />
            </motion.a>
            <motion.a
              href={`mailto:${EMAIL}`}
              aria-label="E-mail"
              className={iconLink}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Mail className="w-4 h-4" strokeWidth={2} />
            </motion.a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 border-t border-[#fef9ed]/15 pt-10">
          <div className="md:col-span-7">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 border border-[#fef9ed]/20 bg-[#fef9ed]/[0.04] px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#fef9ed] hover:bg-[#fef9ed]/[0.07] hover:border-[#fef9ed]/40 transition-colors"
                >
                  <Mail className="h-4 w-4" strokeWidth={2} aria-hidden />
                  {EMAIL}
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#fef9ed]/20 bg-[#fef9ed]/[0.04] px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#fef9ed] hover:bg-[#fef9ed]/[0.07] hover:border-[#fef9ed]/40 transition-colors"
                >
                  <Phone className="h-4 w-4" strokeWidth={2} aria-hidden />
                  +55 (41) 99674-8781
                </a>
              </div>

              <p className="text-xs text-[#fef9ed]/55 font-mono">
                TIMEZONE: AMERICA/SAO_PAULO • RESPONSE_SLA: 24H
              </p>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="font-space-grotesk text-[10px] tracking-widest uppercase space-y-2 text-[#fef9ed]/70">
              <p>© 2026 Kelvin Crepaldi — Desenvolvedor de Software</p>
              <p>Curitiba, Brasil</p>
              <p className="text-[#fef9ed]/45">ROOT // FOOTER_NODE</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
