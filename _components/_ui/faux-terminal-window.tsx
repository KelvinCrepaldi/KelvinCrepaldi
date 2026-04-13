import type { ReactNode } from "react";

type FauxTerminalWindowProps = {
  children: ReactNode;
  className?: string;
  /** Texto à esquerda na barra (estilo prompt / buffer). */
  title?: string;
  /** Classes no invólucro direto do conteúdo (ex.: `aspect-video overflow-hidden`). */
  bodyClassName?: string;
};

/**
 * Moldura de janela só visual: mesma cor do texto da página (`on-surface`), borda alinhada.
 */
export function FauxTerminalWindow({
  children,
  className = "",
  title = "FRAME_BUFFER",
  bodyClassName = "",
}: FauxTerminalWindowProps) {
  return (
    <div
      className={`overflow-hidden border-2 border-on-surface bg-on-surface ${className}`.trim()}
    >
      <div className="flex items-center justify-between gap-3 border-b border-surface/20 bg-on-surface px-2 py-1">
        <span className="min-w-0 truncate font-mono text-[10px] uppercase tracking-[0.14em] text-surface/90">
          {title}
        </span>
        <div className="flex shrink-0 items-center gap-1" aria-hidden>
          <span className="h-1 w-1 rounded-full bg-[#ff5f57]/40" />
          <span className="h-1 w-1 rounded-full bg-[#febc2e]/40" />
          <span className="h-1 w-1 rounded-full bg-[#28c840]/40" />
        </div>
      </div>
      <div className={`relative bg-on-surface ${bodyClassName}`.trim()}>
        {children}
      </div>
    </div>
  );
}
