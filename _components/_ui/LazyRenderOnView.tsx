"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LazyRenderOnViewProps = {
  children: ReactNode;
  rootMargin?: string;
  placeholderClassName?: string;
};

export function LazyRenderOnView({
  children,
  rootMargin = "300px 0px",
  placeholderClassName = "min-h-[45vh]",
}: LazyRenderOnViewProps) {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible || !anchorRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(anchorRef.current);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  if (isVisible) return <>{children}</>;
  return <div ref={anchorRef} className={placeholderClassName} aria-hidden />;
}
