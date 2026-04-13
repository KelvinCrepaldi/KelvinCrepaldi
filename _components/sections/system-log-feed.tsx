"use client";

import { useEffect, useRef, useState } from "react";

import { SystemLogRow } from "./system-log-row";

export type SystemLogFeedEntry = {
  status: string;
  time: string;
  message: string;
};

/** Normaliza rótulo (ex.: `[INFO]` → INFO) e devolve classe: vermelho / verde / azul. */
export function logStatusClassName(
  status: string,
  tone: "default" | "dark" = "default",
): string {
  const key = status
    .replace(/[\[\]]/g, "")
    .trim()
    .toUpperCase();
  const dark = tone === "dark";

  if (
    key === "WARN" ||
    key === "WARNING" ||
    key === "ERROR" ||
    key === "ERR" ||
    key === "FAIL" ||
    key === "FAILED"
  ) {
    return dark
      ? "font-bold text-red-400"
      : "font-bold text-red-600 dark:text-red-400";
  }

  if (key === "OK" || key === "SYNC" || key === "DONE" || key === "SUCCESS") {
    return dark
      ? "font-bold text-green-400"
      : "font-bold text-green-700 dark:text-emerald-400";
  }

  if (key === "INFO") {
    return dark
      ? "font-bold text-sky-400"
      : "font-bold text-blue-600 dark:text-sky-400";
  }

  return dark
    ? "font-bold text-sky-400"
    : "font-bold text-blue-600 dark:text-sky-400";
}

type SystemLogFeedProps = {
  entries: SystemLogFeedEntry[];
  /** Quantas linhas no máximo; a mais antiga some quando passar */
  maxVisible: number;
  /** Tempo base (ms) entre uma mensagem e a próxima */
  baseIntervalMs: number;
  /** Ms extras por caractere no `message`, somados ao intervalo base */
  lengthFactorMs?: number;
  /** Fundo escuro (ex.: faixa do operador) — ajusta cores do texto */
  tone?: "default" | "dark";
  /** Viewport com altura fixa / visibilidade (ex.: `hidden md:block h-[220px] overflow-y-auto`) */
  viewportClassName?: string;
};

export function SystemLogFeed({
  entries,
  maxVisible,
  baseIntervalMs,
  lengthFactorMs = 15,
  tone = "default",
  viewportClassName,
}: SystemLogFeedProps) {
  const [visible, setVisible] = useState<SystemLogFeedEntry[]>([]);
  const indexRef = useRef(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible([]);
    indexRef.current = 0;

    if (entries.length === 0) return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    function scheduleNext(delay: number) {
      timeoutId = setTimeout(tick, delay);
    }

    function tick() {
      if (cancelled) return;

      const i = indexRef.current % entries.length;
      const entry = entries[i];
      indexRef.current += 1;

      setVisible((prev) => {
        const next = [...prev, entry];
        while (next.length > maxVisible) next.shift();
        return next;
      });

      const delay = baseIntervalMs + entry.message.length * lengthFactorMs;
      scheduleNext(delay);
    }

    scheduleNext(baseIntervalMs);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [entries, maxVisible, baseIntervalMs, lengthFactorMs, tone]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [visible]);

  const inner = (
    <div
      className={tone === "dark" ? "space-y-3 text-white/90 pb-1" : "space-y-4"}
    >
      {visible.map((entry, idx) => (
        <SystemLogRow
          key={`${entry.time}-${entry.message}-${idx}`}
          level={
            <span className={logStatusClassName(entry.status, tone)}>
              {entry.status}
            </span>
          }
          time={entry.time}
          message={entry.message}
          tone={tone}
        />
      ))}
    </div>
  );

  if (viewportClassName) {
    return (
      <div
        ref={viewportRef}
        className={`overflow-y-auto overflow-x-hidden overscroll-y-contain [scrollbar-width:thin] ${viewportClassName}`}
      >
        {inner}
      </div>
    );
  }

  return <>{inner}</>;
}
