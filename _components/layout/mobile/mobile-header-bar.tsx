"use client";

import { motion } from "framer-motion";
import { Menu, PanelLeft, X } from "lucide-react";
import Link from "next/link";

import { ThemeToggle } from "@/_components/theme/theme-toggle";

type MobileHeaderBarProps = {
  headerChrome: string;
  title: string;
  titleHref: string;
  navOpen: boolean;
  archiveOpen: boolean;
  onToggleNav: () => void;
  onToggleArchive: () => void;
  onCloseDrawers: () => void;
};

export function MobileHeaderBar({
  headerChrome,
  title,
  titleHref,
  navOpen,
  archiveOpen,
  onToggleNav,
  onToggleArchive,
  onCloseDrawers,
}: MobileHeaderBarProps) {
  return (
    <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-2 md:hidden">
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

      <Link
        href={titleHref}
        onClick={onCloseDrawers}
        className={`truncate text-center text-lg font-black tracking-widest transition-colors duration-300 ${headerChrome}`}
      >
        {title}
      </Link>

      <div className="flex items-center justify-end gap-2">
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
