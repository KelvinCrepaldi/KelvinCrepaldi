"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

const HEADER_H = "var(--site-header-height)";

const PANEL_BASE =
  "fixed inset-x-0 bottom-0 z-[52] flex max-h-[calc(100dvh-var(--site-header-height))] flex-col overflow-hidden border-outline-variant/40 bg-surface md:hidden";

type DrawerSide = "left" | "right";

const slideBySide = {
  left: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
  },
  right: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
  },
} satisfies Record<
  DrawerSide,
  { initial: { x: string }; animate: { x: number }; exit: { x: string } }
>;

type MobileDrawerShellProps = {
  open: boolean;
  side: DrawerSide;
  id: string;
  titleId: string;
  title: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
};

export function MobileDrawerShell({
  open,
  side,
  id,
  titleId,
  title,
  closeLabel,
  onClose,
  children,
}: MobileDrawerShellProps) {
  const slide = slideBySide[side];
  const borderClass =
    side === "left" ? "border-r-2" : "border-l-2";

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label={closeLabel}
            className="fixed inset-x-0 bottom-0 z-[51] bg-black/50 md:hidden"
            style={{ top: HEADER_H }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            id={id}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={`${PANEL_BASE} ${borderClass}`}
            style={{ top: HEADER_H }}
            initial={slide.initial}
            animate={slide.animate}
            exit={slide.exit}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="shrink-0 border-b border-outline-variant/25 bg-surface-container-low/60 px-4 py-2">
              <p
                id={titleId}
                className="text-[9px] font-mono uppercase tracking-[0.35em] text-outline"
              >
                {title}
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain terminal-scrollbar px-4 pb-8 pt-2">
              {children}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
