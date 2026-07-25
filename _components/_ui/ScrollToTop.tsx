"use client";

import { useTranslations } from "@/_components/i18n/locale-provider";
import { useScrollContainer } from "@/_components/layout/scroll-container";
import { AnimatedChevronStack } from "@/_components/_ui/animations/AnimatedChevronStack";
type ScrollToTopProps = {
  className?: string;
  /** Mais respiro antes do footer (homepage). */
  variant?: "default" | "above-footer";
};

const sectionClassName: Record<NonNullable<ScrollToTopProps["variant"]>, string> =
  {
    default:
      "mt-12 flex w-full justify-center py-14 md:mt-16 md:py-20",
    "above-footer":
      "mt-12 flex w-full justify-center py-16 pb-24 md:mt-16 md:py-20 md:pb-32",
  };

export function ScrollToTop({
  className = "",
  variant = "default",
}: ScrollToTopProps) {
  const scrollRef = useScrollContainer();
  const t = useTranslations();

  return (
    <div
      className={`${sectionClassName[variant]} ${className}`.trim()}
    >
      <button
        type="button"
        onClick={() =>
          scrollRef?.current?.scrollTo({ top: 0, behavior: "smooth" })
        }
        className="group flex flex-col items-center gap-2 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-on-surface/40"
        aria-label={t.scrollToTop.aria}
      >
        <AnimatedChevronStack direction="up" />
        <span className="font-mono text-sm uppercase tracking-wider text-on-surface/70 transition-colors group-hover:text-on-surface/90">
          {t.scrollToTop.label}
        </span>
      </button>
    </div>
  );
}
