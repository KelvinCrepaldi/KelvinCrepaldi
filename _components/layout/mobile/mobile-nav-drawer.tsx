"use client";

import Link from "next/link";

import { useTranslations } from "@/_components/i18n/locale-provider";
import { useGoHome } from "@/_components/layout/scroll-container";
import { MobileDrawerShell } from "./mobile-drawer-shell";

const mobileLinkBase =
  "block border-b border-outline-variant/25 py-4 text-sm font-bold uppercase tracking-tighter text-on-surface transition-colors hover:bg-surface-container-low/80 active:bg-surface-container";

type MobileNavDrawerProps = {
  open: boolean;
  pathname: string;
  onClose: () => void;
};

export function MobileNavDrawer({
  open,
  pathname,
  onClose,
}: MobileNavDrawerProps) {
  const isHome = pathname === "/";
  const isProjects = pathname.startsWith("/projects");
  const isLogs = pathname.startsWith("/log");
  const goHome = useGoHome();
  const t = useTranslations();

  return (
    <MobileDrawerShell
      open={open}
      side="right"
      id="mobile-nav-drawer"
      titleId="mobile-nav-title"
      title="NAV_TERMINAL // MOBILE_SESSION"
      closeLabel={t.nav.closeMenu}
      onClose={onClose}
    >
      <nav className="flex flex-col font-space-grotesk" aria-label={t.nav.sections}>
        <Link
          href="/"
          className={`${mobileLinkBase} ${isHome ? "bg-on-surface/5" : ""}`}
          onClick={goHome(onClose)}
        >
          {t.nav.home}
        </Link>
        <Link
          href="/projects"
          className={`${mobileLinkBase} ${isProjects ? "bg-on-surface/5" : ""}`}
          onClick={onClose}
        >
          {t.nav.projects}
        </Link>
        <Link
          href="/log"
          className={`${mobileLinkBase} ${isLogs ? "bg-on-surface/5" : ""}`}
          onClick={onClose}
        >
          {t.nav.logs}
        </Link>
        <Link className={mobileLinkBase} href="/#timeline" onClick={onClose}>
          {t.nav.about}
        </Link>
        <Link className={mobileLinkBase} href="/#skills" onClick={onClose}>
          {t.nav.skills}
        </Link>
        <Link className={mobileLinkBase} href="/#contact" onClick={onClose}>
          {t.nav.contact}
        </Link>
      </nav>
    </MobileDrawerShell>
  );
}
