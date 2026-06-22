"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/_components/theme/theme-toggle";
import { useScrollContainer, useGoHome } from "@/_components/layout/scroll-container";
import {
  getMobileHeaderHref,
  getMobileHeaderTitle,
} from "@/_utils/layout";

import { MobileArchiveDrawer } from "./mobile/mobile-archive-drawer";
import { MobileHeaderBar } from "./mobile/mobile-header-bar";
import { MobileNavDrawer } from "./mobile/mobile-nav-drawer";
import { useMobileDrawers } from "./mobile/use-mobile-drawers";

const THRESHOLD_PX = 28;

export function SiteHeader() {
  const pathname = usePathname();
  const scrollRef = useScrollContainer();
  const goHome = useGoHome();
  const { scrollY } = useScroll(
    scrollRef ? { container: scrollRef } : {},
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const {
    navOpen,
    archiveOpen,
    closeNav,
    closeArchive,
    closeAll,
    toggleNav,
    toggleArchive,
  } = useMobileDrawers();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > THRESHOLD_PX);
  });

  useEffect(() => {
    const top = scrollRef?.current?.scrollTop ?? 0;
    setIsScrolled(top > THRESHOLD_PX);
  }, [pathname, scrollRef]);

  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  const isHome = pathname === "/";
  const isProjects = pathname.startsWith("/projects");
  const isLogs = pathname.startsWith("/log");
  const mobileHeaderTitle = getMobileHeaderTitle(pathname);
  const mobileHeaderHref = getMobileHeaderHref(pathname);

  const inactive = isScrolled
    ? "text-surface/55 hover:text-surface dark:text-on-surface/55 dark:hover:text-on-surface transition-colors duration-150"
    : "text-on-surface/60 hover:text-on-surface transition-colors duration-150";

  const activeHome = isScrolled
    ? "text-surface border-b-2 border-surface pb-1 dark:text-on-surface dark:border-on-surface"
    : "text-on-surface border-b-2 border-on-surface pb-1";

  const activeProjects = isScrolled
    ? "text-surface border-b-2 border-surface pb-1 dark:text-on-surface dark:border-on-surface"
    : "text-on-surface border-b-2 border-on-surface pb-1";

  const activeLogs = isScrolled
    ? "text-surface border-b-2 border-surface pb-1 dark:text-on-surface dark:border-on-surface"
    : "text-on-surface border-b-2 border-on-surface pb-1";

  const bottomRule =
    !isHome &&
    (isScrolled
      ? "border-b border-surface/25 dark:border-on-surface/25"
      : "border-b border-on-surface/18");

  const headerChrome = isScrolled
    ? "text-surface dark:text-on-surface"
    : "text-on-surface";

  return (
    <>
      <motion.nav
        className={`relative z-50 flex h-16 max-h-16 min-h-16 w-full max-w-full shrink-0 items-center justify-between px-6 transition-[colors,box-shadow,border-color] duration-300 ease-out ${
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
                backgroundColor: "rgb(var(--header-unscrolled) / 0.85)",
                boxShadow: "0 0 0 rgba(0,0,0,0)",
              }
        }
        style={{ backdropFilter: "blur(12px)" }}
        aria-label="Navegação principal"
      >
        <div className="flex w-full items-center justify-between gap-3 md:max-w-content md:mx-auto">
          <motion.div
            className="hidden md:block"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/"
              onClick={goHome()}
              className={`text-xl font-black tracking-widest inline-block transition-colors duration-300 ${headerChrome}`}
            >
              main/kelvin :: Developer
            </Link>
          </motion.div>

          <div className="hidden min-w-0 flex-1 items-center justify-end gap-6 md:flex">
            <div className="flex gap-8 font-space-grotesk text-sm font-bold uppercase tracking-tighter">
              <Link href="/" onClick={goHome()} className={isHome ? activeHome : inactive}>
                HOME
              </Link>
              <Link
                href="/projects"
                className={isProjects ? activeProjects : inactive}
              >
                Projetos
              </Link>
              <Link href="/log" className={isLogs ? activeLogs : inactive}>
                Anotações
              </Link>
              <Link className={inactive} href="/#timeline">
                Sobre
              </Link>
              <Link className={inactive} href="/#skills">
                Habilidades
              </Link>
              <Link className={inactive} href="/#contact">
                Contato
              </Link>
            </div>
            <ThemeToggle className={headerChrome} />
          </div>

          <MobileHeaderBar
            headerChrome={headerChrome}
            title={mobileHeaderTitle}
            titleHref={mobileHeaderHref}
            onTitleClick={
              mobileHeaderHref === "/"
                ? goHome(closeAll)
                : undefined
            }
            navOpen={navOpen}
            archiveOpen={archiveOpen}
            onToggleNav={toggleNav}
            onToggleArchive={toggleArchive}
            onCloseDrawers={closeAll}
          />
        </div>
      </motion.nav>

      <MobileNavDrawer open={navOpen} pathname={pathname} onClose={closeNav} />
      <MobileArchiveDrawer
        open={archiveOpen}
        pathname={pathname}
        onClose={closeArchive}
      />
    </>
  );
}
