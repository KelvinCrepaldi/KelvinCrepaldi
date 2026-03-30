import type { IconType } from "react-icons";
import { FaWindows } from "react-icons/fa6";
import {
  SiCss,
  SiDbeaver,
  SiDocker,
  SiElectron,
  SiExpress,
  SiGit,
  SiGithub,
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
  SiSocketdotio,
  SiStyledcomponents,
  SiSupabase,
  SiTailwindcss,
  SiTrello,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { VscCodeOss } from "react-icons/vsc";

export type TechWithIcon = {
  name: string;
  icon: IconType;
};

/** [01] Front-end — frameworks com maior peso */
export const FRONT_FRAMEWORKS: TechWithIcon[] = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Vite", icon: SiVite },
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
  { name: "Electron", icon: SiElectron },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Styled Components", icon: SiStyledcomponents },
  { name: "Redux", icon: SiRedux },
  { name: "Context API", icon: SiReact },
  { name: "React Query", icon: SiReactquery },
  { name: "Socket.io", icon: SiSocketdotio },
  { name: "i18n", icon: SiI18Next },
  { name: "HTML", icon: SiHtml5 },
  { name: "CSS", icon: SiCss },
];

/** [05] Bancada — ferramentas e utilitários */
export const BANCADA_TOOLS: TechWithIcon[] = [
  { name: "Git", icon: SiGit },
  { name: "GitHub", icon: SiGithub },
  { name: "VS Code", icon: VscCodeOss },
  { name: "Docker", icon: SiDocker },
  { name: "Postman", icon: SiPostman },
  { name: "DBeaver", icon: SiDbeaver },
  { name: "Notion", icon: SiNotion },
  { name: "Trello", icon: SiTrello },
  { name: "Linux", icon: SiLinux },
  { name: "Windows", icon: FaWindows },
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
