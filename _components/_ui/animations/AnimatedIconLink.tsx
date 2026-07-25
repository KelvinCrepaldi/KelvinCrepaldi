"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type AnimatedIconLinkProps = {
  href: string;
  "aria-label": string;
  icon: LucideIcon;
  children?: ReactNode;
  download?: string | boolean;
  className?: string;
  /** Abre em nova aba (padrão para http/https, exceto download) */
  external?: boolean;
};

function isHttpUrl(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function AnimatedIconLink({
  href,
  "aria-label": ariaLabel,
  icon: Icon,
  children,
  download,
  className = "",
  external,
}: AnimatedIconLinkProps) {
  const withLabel = children != null;
  const openExternal =
    external ?? (download == null && isHttpUrl(href));

  return (
    <motion.a
      href={href}
      download={download}
      aria-label={ariaLabel}
      {...(openExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={[
        "group relative inline-flex h-10 items-center justify-center overflow-hidden",
        "border border-outline-variant bg-transparent text-on-surface",
        "font-mono text-xs uppercase tracking-widest",
        "transition-[border-color,color,background-color,box-shadow] duration-150 ease-out",
        "hover:border-terminal-accent hover:text-terminal-accent",
        "hover:shadow-[2px_2px_0_0_rgb(var(--terminal-accent)/0.45)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terminal-accent/50",
        withLabel ? "gap-2 px-3" : "w-10",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      whileHover="hover"
      whileTap="tap"
      initial="rest"
      variants={{
        rest: { x: 0, y: 0 },
        hover: { x: 0, y: 0 },
        tap: { x: 1, y: 1 },
      }}
      transition={{ duration: 0.08, ease: "linear" }}
    >
      {/* Cantos técnicos */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-1.5 w-1.5 border-l border-t border-terminal-accent opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-1.5 w-1.5 border-r border-t border-terminal-accent opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-1.5 w-1.5 border-b border-l border-terminal-accent opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-1.5 w-1.5 border-b border-r border-terminal-accent opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      />

      {/* Scanlines CRT */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:hidden"
      >
        <span className="absolute inset-0 animate-[scanlines-down_0.45s_linear_infinite] bg-[repeating-linear-gradient(0deg,transparent_0,transparent_2px,rgb(var(--terminal-accent)/0.1)_2px,rgb(var(--terminal-accent)/0.1)_4px)] bg-[length:100%_4px]" />
      </span>

      {/* Flash de boot / glitch */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-terminal-accent/15"
        variants={{
          rest: { opacity: 0 },
          hover: {
            opacity: [0, 0.55, 0, 0.25, 0],
            transition: { duration: 0.28, times: [0, 0.15, 0.35, 0.55, 1] },
          },
          tap: { opacity: 0.2 },
        }}
      />

      <motion.span
        className="relative z-[3] inline-flex items-center gap-2"
        variants={{
          rest: { x: 0 },
          hover: {
            x: [0, -1, 1, -1, 0],
            transition: { duration: 0.22, times: [0, 0.25, 0.5, 0.75, 1] },
          },
          tap: { x: 0 },
        }}
      >
        <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
        {children}
      </motion.span>
    </motion.a>
  );
}
