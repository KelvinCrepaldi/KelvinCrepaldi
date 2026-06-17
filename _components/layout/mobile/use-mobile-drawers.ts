"use client";

import { useCallback, useEffect, useState } from "react";

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

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
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
