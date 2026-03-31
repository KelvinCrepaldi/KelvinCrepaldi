import type { ComponentType } from "react";
import { FaWindows } from "react-icons/fa6";
import {
  SiCss,
  SiDbeaver,
  SiDocker,
  SiElectron,
  SiExpress,
  SiGit,
  SiGithub,
  SiGoogle,
  SiHtml5,
  SiI18Next,
  SiJavascript,
  SiLinux,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiNotion,
  SiPostman,
  SiReact,
  SiReactquery,
  SiRedux,
  SiRoboflow,
  SiShadcnui,
  SiSocketdotio,
  SiStyledcomponents,
  SiSupabase,
  SiTailwindcss,
  SiTrello,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { VscCodeOss } from "react-icons/vsc";

const CURSOR_SVG_PATH =
  "M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23";

const CursorIdeIcon: ComponentType<{ className?: string }> = ({
  className,
}) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-label="Cursor"
    className={className}
    fill="currentColor"
  >
    <path d={CURSOR_SVG_PATH} />
  </svg>
);

export type TechWithIcon = {
  name: string;
  icon: ComponentType<{ className?: string }>;
};

/** [01] Front-end — frameworks com maior peso */
export const FRONT_FRAMEWORKS: TechWithIcon[] = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Electron", icon: SiElectron },
  { name: "TypeScript", icon: SiTypescript },
];

/** [02] Backend — runtime, APIs e dados (inclui Supabase) */
export const BACKEND_STACK: TechWithIcon[] = [
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express", icon: SiExpress },
  { name: "Supabase", icon: SiSupabase },
  { name: "Nest.js", icon: SiNestjs },
];

/** [03] Ecossistema — libs, UI, estado e base web */
export const ECOSYSTEM_LIBS: TechWithIcon[] = [
  { name: "Styled Components", icon: SiStyledcomponents },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "React Query", icon: SiReactquery },
  { name: "shadcn/ui", icon: SiShadcnui },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Context API", icon: SiReact },
  { name: "Socket.io", icon: SiSocketdotio },
  { name: "Redux", icon: SiRedux },
  { name: "i18n", icon: SiI18Next },
  { name: "HTML", icon: SiHtml5 },
  { name: "CSS", icon: SiCss },
  { name: "Vite", icon: SiVite },
];

/** [05] Bancada — ferramentas e utilitários */
export const BANCADA_TOOLS: TechWithIcon[] = [
  { name: "Stitch (Google)", icon: SiGoogle },
  { name: "VS CODE IDE", icon: VscCodeOss },
  { name: "CURSOR IDE", icon: CursorIdeIcon },
  { name: "Windows", icon: FaWindows },
  { name: "DBeaver", icon: SiDbeaver },
  { name: "Postman", icon: SiPostman },
  { name: "Git", icon: SiGit },
  { name: "GitHub", icon: SiGithub },
  { name: "Docker", icon: SiDocker },
  { name: "Notion", icon: SiNotion },
  { name: "Trello", icon: SiTrello },
  { name: "Roboflow", icon: SiRoboflow },
  { name: "Linux", icon: SiLinux },
];

export const SOFT_SKILLS = [
  "Scrum",
  "Kanban",
  "Comunicação",
  "Proatividade",
  "Liderança",
  "Coordenação de equipe",
  "Mentoria",
  "Planejamento",
  "Adaptabilidade",
] as const;
