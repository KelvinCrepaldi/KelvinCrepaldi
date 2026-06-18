"use client";

import { useCallback, useEffect, useState } from "react";

import { SITE_SCROLL_ID } from "@/_components/layout/scroll-container";

function getScrollElement() {
  return document.getElementById(SITE_SCROLL_ID);
}

export function useMobileDrawers() {
  const [navOpen, setNavOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);

  const closeNav = useCallback(() => setNavOpen(false), []);
  const closeArchive = useCallback(() => setArchiveOpen(false), []);
  const closeAll = useCallback(() => {
    setNavOpen(false);
    setArchiveOpen(false);
  }, []);

  const toggleNav = useCallback(() => {
    setNavOpen((open) => {
      if (!open) setArchiveOpen(false);
      return !open;
    });
  }, []);

  const toggleArchive = useCallback(() => {
    setArchiveOpen((open) => {
      if (!open) setNavOpen(false);
      return !open;
    });
  }, []);

  useEffect(() => {
    if (!navOpen && !archiveOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navOpen, archiveOpen, closeAll]);

  useEffect(() => {
    if (!navOpen && !archiveOpen) return;

    const scrollEl = getScrollElement();
    if (!scrollEl) return;

    const prevOverflow = scrollEl.style.overflow;
    scrollEl.style.overflow = "hidden";

    return () => {
      scrollEl.style.overflow = prevOverflow;
    };
  }, [navOpen, archiveOpen]);

  return {
    navOpen,
    archiveOpen,
    closeNav,
    closeArchive,
    closeAll,
    toggleNav,
    toggleArchive,
  };
}
