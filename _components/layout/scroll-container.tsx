"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";

export const SITE_SCROLL_ID = "site-scroll";

const ScrollContainerContext =
  createContext<RefObject<HTMLDivElement | null> | null>(null);

function scrollToHashTarget(hash: string, behavior: ScrollBehavior = "smooth") {
  const target = document.querySelector(hash);
  if (!(target instanceof HTMLElement)) return;
  target.scrollIntoView({ behavior, block: "start" });
}

function useHashScroll(scrollRef: RefObject<HTMLDivElement | null>) {
  const pathname = usePathname();

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const hash = window.location.hash;
    if (hash) {
      requestAnimationFrame(() => scrollToHashTarget(hash));
      return;
    }

    container.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, scrollRef]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onHashChange = () => {
      const hash = window.location.hash;
      if (!hash) return;
      requestAnimationFrame(() => scrollToHashTarget(hash));
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [scrollRef]);
}

export function ScrollContainerProvider({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useHashScroll(scrollRef);

  return (
    <ScrollContainerContext.Provider value={scrollRef}>
      {children}
    </ScrollContainerContext.Provider>
  );
}

export function SiteScrollViewport({ children }: { children: ReactNode }) {
  const scrollRef = useContext(ScrollContainerContext);

  return (
    <div
      ref={scrollRef ?? undefined}
      id={SITE_SCROLL_ID}
      className="site-scroll terminal-scrollbar min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain"
    >
      {children}
    </div>
  );
}

export function useScrollContainer() {
  return useContext(ScrollContainerContext);
}
