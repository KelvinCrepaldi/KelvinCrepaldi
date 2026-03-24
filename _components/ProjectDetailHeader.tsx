import { BackToArchiveLink } from "./_ui/BackToArchiveLink";
import { BlinkingDotRow } from "./_ui/BlinkingDotRow";
import { ProjectTag } from "./ProjectTag";
import type { ProjectListItem } from "@/_utils/types";

type ProjectDetailHeaderProps = {
  project: ProjectListItem;
  subtitle?: string;
  /** Classes de padding horizontal (devem coincidir com a zona do Markdown) */
  contentGutterClass?: string;
};

export function ProjectDetailHeader({
  project,
  subtitle,
  contentGutterClass = "px-6 md:px-10 lg:px-12 xl:px-14",
}: ProjectDetailHeaderProps) {
  return (
    <header
      className={`relative border-b border-outline-variant/20 bg-surface/88 pt-8 pb-10 backdrop-blur-sm md:pt-10 md:pb-11 lg:pt-11 lg:pb-12 ${contentGutterClass}`}
    >
      <div className="w-full max-w-3xl text-left">
        <BackToArchiveLink />
        <div className="mt-1 flex flex-col gap-4 md:gap-5">
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-tighter text-on-surface/50">
            <BlinkingDotRow count={3} size="sm" />
            <span>{project.vol}</span>
            <span className="opacity-30">|</span>
            <span>LAST_STABLE_BUILD: {project.lastStableBuild}</span>
          </div>
          <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tighter text-on-surface md:text-6xl lg:text-7xl">
            {project.title}
          </h1>
          {subtitle ? (
            <p className="max-w-2xl text-lg italic leading-snug text-on-surface/80 md:text-xl">
              {subtitle}
            </p>
          ) : null}
          <p className="max-w-2xl text-sm leading-relaxed text-on-surface/70">
            {project.excerpt}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((tag) => (
              <ProjectTag key={tag} label={tag} />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
