"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const HEADER_H = "var(--site-header-height)";

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
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Fechar menu"
            className="fixed inset-0 z-[52] bg-on-surface/80 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-nav-title"
            className="fixed right-0 bottom-0 left-0 z-[53] flex max-h-[calc(100dvh-var(--site-header-height))] flex-col overflow-hidden border-t-2 border-outline-variant/40 bg-surface shadow-[0_-8px_32px_rgba(0,0,0,0.14)] dark:shadow-[0_-8px_32px_rgba(0,0,0,0.35)] md:hidden"
            style={{ top: HEADER_H }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="shrink-0 border-b border-outline-variant/25 bg-surface-container-low/60 px-4 py-2">
              <p
                id="mobile-nav-title"
                className="text-[9px] font-mono uppercase tracking-[0.35em] text-outline"
              >
                NAV_TERMINAL // MOBILE_SESSION
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-8 pt-2">
              <nav
                className="flex flex-col font-space-grotesk"
                aria-label="Secções"
              >
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
                <Link
                  className={mobileLinkBase}
                  href="/#about"
                  onClick={onClose}
                >
                  ABOUT
                </Link>
                <Link
                  className={mobileLinkBase}
                  href="/#skills"
                  onClick={onClose}
                >
                  SKILLS
                </Link>
                <Link
                  className={mobileLinkBase}
                  href="/#contact"
                  onClick={onClose}
                >
                  CONTACT
                </Link>
              </nav>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
