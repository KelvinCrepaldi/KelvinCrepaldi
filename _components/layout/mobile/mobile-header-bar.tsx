"use client";

import { motion } from "framer-motion";
import { Menu, PanelLeft, X } from "lucide-react";
import Link from "next/link";

import { LanguageSelect } from "@/_components/i18n/language-select";
import { useTranslations } from "@/_components/i18n/locale-provider";
import { ThemeToggle } from "@/_components/theme/theme-toggle";

type MobileHeaderBarProps = {
  headerChrome: string;
  title: string;
  titleHref: string;
  onTitleClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
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
  onTitleClick,
  navOpen,
  archiveOpen,
  onToggleNav,
  onToggleArchive,
  onCloseDrawers,
}: MobileHeaderBarProps) {
  const t = useTranslations();

  return (
    <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-2 md:hidden">
      <motion.button
        type="button"
        className={`p-2 transition-colors duration-300 ${headerChrome}`}
        aria-label={archiveOpen ? t.nav.closeArchive : t.nav.openArchive}
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
        onClick={onTitleClick ?? onCloseDrawers}
        className={`truncate text-center text-lg font-black tracking-widest transition-colors duration-300 ${headerChrome}`}
      >
        {title}
      </Link>

      <div className="flex items-center justify-end gap-2">
        <LanguageSelect className={headerChrome} />
        <ThemeToggle className={headerChrome} />
        <motion.button
          type="button"
          className={`p-2 transition-colors duration-300 ${headerChrome}`}
          aria-label={navOpen ? t.nav.closeMenu : t.nav.openMenu}
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
