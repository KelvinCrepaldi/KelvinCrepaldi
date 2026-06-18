"use client";

import Link from "next/link";

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

  return (
    <MobileDrawerShell
      open={open}
      side="right"
      id="mobile-nav-drawer"
      titleId="mobile-nav-title"
      title="NAV_TERMINAL // MOBILE_SESSION"
      closeLabel="Fechar menu"
      onClose={onClose}
    >
      <nav className="flex flex-col font-space-grotesk" aria-label="Secções">
        <Link
          href="/"
          className={`${mobileLinkBase} ${isHome ? "bg-on-surface/5" : ""}`}
          onClick={onClose}
        >
          HOME
        </Link>
        <Link
          href="/projects"
          className={`${mobileLinkBase} ${isProjects ? "bg-on-surface/5" : ""}`}
          onClick={onClose}
        >
          PROJECTS
        </Link>
        <Link
          href="/log"
          className={`${mobileLinkBase} ${isLogs ? "bg-on-surface/5" : ""}`}
          onClick={onClose}
        >
          LOG
        </Link>
        <Link className={mobileLinkBase} href="/#timeline" onClick={onClose}>
          ABOUT
        </Link>
        <Link className={mobileLinkBase} href="/#skills" onClick={onClose}>
          SKILLS
        </Link>
        <Link className={mobileLinkBase} href="/#contact" onClick={onClose}>
          CONTACT
        </Link>
      </nav>
    </MobileDrawerShell>
  );
}
