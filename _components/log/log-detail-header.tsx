import { BackToLogLink } from "@/_components/log/back-to-log-link";
import { BlinkingDotRow } from "@/_components/_ui/animations/BlinkingDotRow";
import { formatLogDate, type ResolvedLogPost } from "@/_utils/logs";
import type { Locale } from "@/_i18n/locales";
import { LogTag } from "./log-tag";

type LogDetailHeaderProps = {
  log: ResolvedLogPost;
  locale: Locale;
  contentGutterClass?: string;
};

export function LogDetailHeader({
  log,
  locale,
  contentGutterClass = "px-6 md:px-10 lg:px-12 xl:px-14",
}: LogDetailHeaderProps) {
  return (
    <header
      className={`relative border-b border-outline-variant/20 bg-surface pt-8 pb-10 md:pt-10 md:pb-12 lg:pt-11 lg:pb-14 ${contentGutterClass}`}
    >
      <div className="w-full max-w-3xl text-left">
        <BackToLogLink />
        <div className="mt-1 flex flex-col gap-4 md:gap-5">
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-tighter text-terminal-accent/70">
            <BlinkingDotRow count={3} size="sm" />
            <span>{log.logId}</span>
            <span className="opacity-30">|</span>
            <span>PUBLISHED_AT: {formatLogDate(log.publishedAt, locale)}</span>
          </div>
          <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tighter text-on-surface md:text-6xl lg:text-7xl">
            {log.title}
          </h1>
          <p className="max-w-2xl text-body text-on-surface/70">
            {log.excerpt}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {log.tags.map((tag) => (
              <LogTag key={tag} label={tag} />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
