"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

import { useTheme } from "./theme-provider";

type ThemeToggleProps = {
  /** Cor do ícone (ex.: text-on-surface ou text-surface no header ao rolar) */
  className?: string;
};

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme, ready } = useTheme();
  const isDark = theme === "dark";

  if (!ready) {
    return (
      <span
        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center ${className}`}
        aria-hidden
      />
    );
  }

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className={`relative z-[60] inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-none border border-transparent transition-colors duration-300 hover:bg-on-surface/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-surface/40 ${className}`.trim()}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      title={isDark ? "Tema claro" : "Tema escuro"}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.06 }}
    >
      {isDark ? (
        <Sun className="h-5 w-5" strokeWidth={2} aria-hidden />
      ) : (
        <Moon className="h-5 w-5" strokeWidth={2} aria-hidden />
      )}
    </motion.button>
  );
}
