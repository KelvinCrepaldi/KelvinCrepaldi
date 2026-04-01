"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { PROJECTS_CATALOG } from "@/_utils/projects";

const THRESHOLD_PX = 28;

const HEADER_H = "var(--site-header-height)";

export function SiteHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > THRESHOLD_PX);
  });

  useEffect(() => {
    setIsScrolled(window.scrollY > THRESHOLD_PX);
  }, [pathname]);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  const isHome = pathname === "/";
  const isProjects = pathname.startsWith("/projects");
  const projectSlug =
    pathname.startsWith("/projects/") && pathname.length > "/projects/".length
      ? pathname.slice("/projects/".length).split("/")[0]
      : null;

  const inactive = isScrolled
    ? "text-[#fef9ed]/55 hover:text-[#fef9ed] transition-colors duration-150"
    : "text-[#363322]/60 hover:text-[#363322] transition-colors duration-150";

  const activeHome = isScrolled
    ? "text-[#fef9ed] border-b-2 border-[#fef9ed] pb-1"
    : "text-[#363322] border-b-2 border-[#363322] pb-1";

  const activeProjects = isScrolled
    ? "text-[#fef9ed] border-b-2 border-[#fef9ed] pb-1"
    : "text-[#363322] border-b-2 border-[#363322] pb-1";

  const bottomRule =
    !isHome &&
    (isScrolled
      ? "border-b border-[#fef9ed]/25"
      : "border-b border-on-surface/18");

  const mobileLinkBase =
    "block border-b border-outline-variant/25 py-4 text-sm font-bold uppercase tracking-tighter text-on-surface transition-colors hover:bg-surface-container-low/80 active:bg-surface-container";

  const catalog = PROJECTS_CATALOG;

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 flex h-16 max-h-16 min-h-16 w-full max-w-full items-center justify-between px-6 transition-[colors,box-shadow,border-color] duration-300 ease-out ${
          bottomRule || "border-b-0 border-transparent"
        }`}
        initial={false}
        animate={
          isScrolled
            ? {
                backgroundColor: "rgba(54, 51, 34, 0.94)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
              }
            : {
                backgroundColor: "rgba(254, 249, 237, 0.85)",
                boxShadow: "0 0 0 rgba(0,0,0,0)",
              }
        }
        style={{ backdropFilter: "blur(12px)" }}
        aria-label="Navegação principal"
      >
        <div className="w-full lg:max-w-6xl lg:mx-auto flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/"
              className={`text-xl font-black tracking-widest inline-block transition-colors duration-300 ${
                isScrolled ? "text-[#fef9ed]" : "text-[#363322]"
              }`}
              onClick={closeMenu}
            >
              DEV_WORKBENCH
            </Link>
          </motion.div>
          <div className="hidden md:flex gap-8 font-space-grotesk uppercase tracking-tighter font-bold text-sm">
            <Link href="/" className={isHome ? activeHome : inactive}>
              HOME
            </Link>
            <Link
              href="/#projects"
              className={isProjects ? activeProjects : inactive}
            >
              PROJECTS
            </Link>
            <Link className={inactive} href="/#timeline" onClick={closeMenu}>
              ABOUT
            </Link>
            <Link className={inactive} href="/#skills" onClick={closeMenu}>
              SKILLS
            </Link>
            <Link className={inactive} href="/#contact" onClick={closeMenu}>
              CONTACT
            </Link>
          </div>
          <motion.button
            type="button"
            className={`relative z-[60] md:hidden p-2 transition-colors duration-300 ${
              isScrolled ? "text-[#fef9ed]" : "text-[#363322]"
            }`}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <X className="h-7 w-7" strokeWidth={2} />
            ) : (
              <Menu className="h-7 w-7" strokeWidth={2} />
            )}
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Fechar menu"
              className="fixed inset-0 z-[52] bg-[#363322]/80 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
            />
            <motion.div
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-nav-title"
              className="fixed right-0 bottom-0 left-0 z-[53] flex max-h-[calc(100dvh-var(--site-header-height))] flex-col overflow-hidden border-t-2 border-outline-variant/40 bg-surface shadow-[0_-8px_32px_rgba(54,51,34,0.12)] md:hidden"
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
                    onClick={closeMenu}
                  >
                    HOME
                  </Link>
                  <Link
                    href="/#projects"
                    className={`${mobileLinkBase} ${isProjects ? "bg-on-surface/5" : ""}`}
                    onClick={closeMenu}
                  >
                    PROJECTS
                  </Link>
                  <Link
                    className={mobileLinkBase}
                    href="/#timeline"
                    onClick={closeMenu}
                  >
                    ABOUT
                  </Link>
                  <Link
                    className={mobileLinkBase}
                    href="/#skills"
                    onClick={closeMenu}
                  >
                    SKILLS
                  </Link>
                  <Link
                    className={mobileLinkBase}
                    href="/#contact"
                    onClick={closeMenu}
                  >
                    CONTACT
                  </Link>
                </nav>

                {isProjects ? (
                  <div className="mt-6 border-t-2 border-outline-variant/30 pt-5">
                    <p className="mb-3 text-[9px] font-mono uppercase tracking-[0.4em] text-outline">
                      ARCHIVE_INDEX // VOLUMES
                    </p>
                    <p className="mb-3 text-[10px] font-mono text-on-surface/45">
                      QUICK_LINK_PROTOCOL
                    </p>
                    <ul className="flex flex-col gap-1" role="list">
                      {catalog.map((p) => {
                        const active = projectSlug === p.slug;
                        return (
                          <li key={p.slug}>
                            <Link
                              href={`/projects/${p.slug}`}
                              onClick={closeMenu}
                              className={[
                                "block border border-transparent px-3 py-3 transition-colors",
                                active
                                  ? "border-on-surface bg-on-surface text-surface"
                                  : "text-on-surface hover:border-outline-variant/40 hover:bg-surface-container-high/90",
                              ].join(" ")}
                            >
                              <span
                                className={
                                  active
                                    ? "text-[9px] font-mono uppercase tracking-widest text-surface/70"
                                    : "text-[9px] font-mono uppercase tracking-widest text-outline"
                                }
                              >
                                {p.vol}
                              </span>
                              <span className="mt-0.5 block text-xs font-bold uppercase tracking-tight">
                                {p.title}
                              </span>
                              <span
                                className={
                                  active
                                    ? "mt-0.5 block truncate font-mono text-[9px] text-surface/50"
                                    : "mt-0.5 block truncate font-mono text-[9px] text-on-surface/40"
                                }
                              >
                                [{p.slug}]
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    <p className="mt-4 text-[8px] font-mono text-on-surface/35">
                      :: SELECT_ENTRY_TO_MOUNT_VOLUME
                    </p>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
