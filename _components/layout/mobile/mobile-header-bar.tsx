"use client";

import { motion } from "framer-motion";
import { Menu, PanelLeft, X } from "lucide-react";
import Link from "next/link";

import { ThemeToggle } from "@/_components/theme/theme-toggle";

type MobileHeaderBarProps = {
  headerChrome: string;
  showArchiveButton: boolean;
  navOpen: boolean;
  archiveOpen: boolean;
  onToggleNav: () => void;
  onToggleArchive: () => void;
  onCloseDrawers: () => void;
};

export function MobileHeaderBar({
  headerChrome,
  showArchiveButton,
  navOpen,
  archiveOpen,
  onToggleNav,
  onToggleArchive,
  onCloseDrawers,
}: MobileHeaderBarProps) {
  return (
    <div className="grid w-full grid-cols-[2.5rem_1fr_2.5rem] items-center gap-2 md:hidden">
      <div className="flex justify-start">
        {showArchiveButton ? (
          <motion.button
            type="button"
            className={`p-2 transition-colors duration-300 ${headerChrome}`}
            aria-label={archiveOpen ? "Fechar índice" : "Abrir índice de arquivo"}
            aria-expanded={archiveOpen}
            aria-controls="mobile-archive-drawer"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={onToggleArchive}
          >
            {archiveOpen ? (
              <X className="h-7 w-7" strokeWidth={2} />
            ) : (
              <PanelLeft className="h-7 w-7" strokeWidth={2} />
            )}
          </motion.button>
        ) : (
          <span className="h-11 w-11" aria-hidden />
        )}
      </div>

      <Link
        href="/"
        onClick={onCloseDrawers}
        className={`truncate text-center text-sm font-black tracking-widest transition-colors duration-300 ${headerChrome}`}
      >
        main/kelvin
      </Link>

      <div className="flex items-center justify-end gap-0.5">
        <ThemeToggle className={headerChrome} />
        <motion.button
          type="button"
          className={`p-2 transition-colors duration-300 ${headerChrome}`}
          aria-label={navOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={navOpen}
          aria-controls="mobile-nav-drawer"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={onToggleNav}
        >
          {navOpen ? (
            <X className="h-7 w-7" strokeWidth={2} />
          ) : (
            <Menu className="h-7 w-7" strokeWidth={2} />
          )}
        </motion.button>
      </div>
    </div>
  );
}
