import reactIcon from "/public/react-icon.svg";
import nextJsIcon from "/public/nextjs-icon.svg";
import reduxIcon from "/public/redux-icon.svg";
import typescriptIcon from "/public/typescript-icon.svg";
import tailwindIcon from "/public/tailwind-icon.svg";
import nodeIcon from "/public/node-icon.svg";
import githubIcon from "/public/github-icon.svg";
import framerMotionIcon from "/public/framerMotion-icon.svg";
import dockerIcon from "/public/docker-icon.svg";
import postgressIcon from "/public/postgresql-icon.svg";

export interface skillsType {
  name: string;
  description: string;
  image: string;
}

export const skills: skillsType[] = [
  {
    name: "React",
    description:
      "Desenvolvi aplicações web interativas e responsivas utilizando o framework React, proporcionando uma experiência de usuário dinâmica e atraente.",
    image: reactIcon,
  },
  {
    name: "Redux",
    description:
      "Gerenciei o estado global de aplicativos React com Redux, melhorando a previsibilidade e a escalabilidade do gerenciamento de dados.",
    image: reduxIcon,
  },
  {
    name: "Context API",
    description:
      "Utilizei a Context API do React para compartilhar estados e dados entre componentes de maneira eficiente, facilitando o desenvolvimento de aplicações complexas.",
    image: reactIcon,
  },
  {
    name: "Next.js",
    description:
      "Utilizei o Next.js para construir aplicações web de alto desempenho, melhorando a renderização no lado do servidor e a otimização de SEO.",
    image: nextJsIcon,
  },
  {
    name: "TypeScript",
    description:
      "Desenvolvi aplicações mais seguras e com código mais legível utilizando TypeScript, adicionando tipagem estática ao JavaScript.",
    image: typescriptIcon,
  },
  {
    name: "Tailwind CSS",
    description:
      "Criei interfaces de usuário elegantes e responsivas com o auxílio do Tailwind CSS, economizando tempo e melhorando a consistência do design.",
    image: tailwindIcon,
  },
  {
    name: "Node.js/Express",
    description:
      "Criei servidores robustos e escaláveis usando Node.js com o framework Express, permitindo a construção de APIs eficientes e aplicações em tempo real.",
    image: nodeIcon,
  },
  {
    name: "GitHub",
    description:
      "Colaborei com equipes de desenvolvimento usando o GitHub, facilitando o controle de versão, revisão de código e integração contínua.",
    image: githubIcon,
  },
  {
    name: "Framer Motion",
    description:
      "Adicionei animações atraentes e interações suaves às minhas aplicações React com o Framer Motion.",
    image: framerMotionIcon,
  },
  {
    name: "Docker",
    description:
      "Implementei ambientes de desenvolvimento e produção consistentes e isolados com o Docker, simplificando o gerenciamento de contêineres e a implantação de aplicativos.",
    image: dockerIcon,
  },
  {
    name: "PostgreSQL",
    description:
      "Trabalhei com bancos de dados PostgreSQL, garantindo alta confiabilidade, desempenho e segurança para aplicações com dados críticos.",
    image: postgressIcon,
  },
];
