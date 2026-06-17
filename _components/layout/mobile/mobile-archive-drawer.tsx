"use client";

import { AnimatePresence, motion } from "framer-motion";

import { ArchiveIndexContent } from "@/_components/archive/archive-index-content";
import {
  getLogSlugFromPath,
  getProjectSlugFromPath,
} from "@/_utils/layout";

const HEADER_H = "var(--site-header-height)";

type MobileArchiveDrawerProps = {
  open: boolean;
  pathname: string;
  onClose: () => void;
};

export function MobileArchiveDrawer({
  open,
  pathname,
  onClose,
}: MobileArchiveDrawerProps) {
  const projectSlug = getProjectSlugFromPath(pathname);
  const logSlug = getLogSlugFromPath(pathname);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Fechar índice"
            className="fixed inset-0 z-[52] bg-on-surface/80 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.aside
            id="mobile-archive-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-archive-title"
            className="fixed right-0 bottom-0 left-0 z-[53] flex max-h-[calc(100dvh-var(--site-header-height))] flex-col overflow-hidden border-t-2 border-outline-variant/40 bg-surface shadow-[0_-8px_32px_rgba(0,0,0,0.14)] dark:shadow-[0_-8px_32px_rgba(0,0,0,0.35)] md:hidden"
            style={{ top: HEADER_H }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="shrink-0 border-b border-outline-variant/25 bg-surface-container-low/60 px-4 py-2">
              <p
                id="mobile-archive-title"
                className="text-[9px] font-mono uppercase tracking-[0.35em] text-outline"
              >
                ARCHIVE_TERMINAL // INDEX
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-8 pt-2">
              <ArchiveIndexContent
                projectSlug={projectSlug}
                logSlug={logSlug}
                onNavigate={onClose}
              />
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
