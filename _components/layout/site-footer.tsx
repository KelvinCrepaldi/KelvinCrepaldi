"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

const iconLink =
  "flex items-center justify-center w-10 h-10 rounded-none border border-[#fef9ed]/25 text-[#fef9ed]/80 hover:text-white hover:border-[#fef9ed]/60";

const contactLink =
  "inline-flex items-center gap-3 border border-[#fef9ed]/20 bg-[#fef9ed]/[0.04] px-5 py-4 text-base font-bold uppercase tracking-widest text-[#fef9ed] hover:bg-[#fef9ed]/[0.07] hover:border-[#fef9ed]/40 transition-colors md:text-lg";

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
      <div className="mx-auto w-full max-w-content">
        <p className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#fef9ed]">
          Contato
        </p>

        <div className="mt-10 flex flex-col items-start gap-4 border-t border-[#fef9ed]/15 pt-10">
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

          <a href={`mailto:${EMAIL}`} className={contactLink}>
            <Mail className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
            {EMAIL}
          </a>
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className={contactLink}
          >
            <FaWhatsapp className="h-5 w-5 shrink-0" aria-hidden />
            +55 (41) 99674-8781
          </a>

          <p className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#fef9ed]/70">
            <motion.span
              aria-hidden
              className="inline-flex"
              animate={{ opacity: [0.25, 1, 0.25] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
            </motion.span>
            Curitiba, Paraná, Brasil
          </p>
        </div>

        <p className="mt-12 font-space-grotesk text-[10px] tracking-widest uppercase text-[#fef9ed]/55">
          © 2026 Kelvin Crepaldi — Desenvolvedor de Software
        </p>
      </div>
    </footer>
  );
}
