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
    <footer className="relative z-10 bg-[#363322] dark:bg-[#0a0a0a] text-[#fef9ed] flex flex-col w-full px-8 py-12 gap-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="font-space-grotesk text-[10px] tracking-widest uppercase space-y-1">
          <p>© 2026 Kelvin Crepaldi — Desenvolvedor Front-end</p>
          <a
            href={`mailto:${EMAIL}`}
            className="block hover:underline opacity-90"
          >
            {EMAIL}
          </a>
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:underline opacity-90"
          >
            <Phone className="w-3 h-3 inline" strokeWidth={2} />
            +55 (41) 99674-8781
          </a>
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
    </footer>
  );
}
