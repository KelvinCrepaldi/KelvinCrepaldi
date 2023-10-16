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
import html5 from "/public/html5-icon.png";
import css3 from "/public/css3-icon.png";
import javascript from "/public/javascript-icon.png";
import styledComponentsIcon from "/public/styledcomponents-icon.png";

export interface skillsType {
  name: string;
  description: string;
  image: string;
}

export const skills: skillsType[] = [
  {
    name: "HTML5",
    description:
      "Utilizei HTML5 para estruturar o conteúdo das páginas da web, garantindo acessibilidade e conformidade com os padrões da web.",
    image: html5,
  },
  {
    name: "CSS3",
    description:
      "Utilizei CSS3 para estilizar e aprimorar a apresentação visual das aplicações. Garanti que os layouts fossem responsivos e atraentes, proporcionando aos usuários uma experiência visualmente agradável.",
    image: css3,
  },
  {
    name: "Javascript",
    description:
      "Utilizei JavaScript para adicionar funcionalidades dinâmicas e interatividade às minhas aplicações React, melhorando a experiência do usuário.",
    image: javascript,
  },
  {
    name: "TypeScript",
    description:
      "Desenvolvi aplicações mais seguras e com código mais legível utilizando TypeScript, adicionando tipagem estática ao JavaScript.",
    image: typescriptIcon,
  },
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
    name: "Framer Motion",
    description:
      "Adicionei animações atraentes e interações suaves às minhas aplicações React com o Framer Motion.",
    image: framerMotionIcon,
  },
  {
    name: "Tailwind CSS",
    description:
      "Criei interfaces de usuário elegantes e responsivas com o auxílio do Tailwind CSS, economizando tempo e melhorando a consistência do design.",
    image: tailwindIcon,
  },
  {
    name: "Styled-Components",
    description:
      "Utilizei Styled-Components para estilizar componentes React de maneira eficiente e modular, garantindo uma aparência consistente e fácil manutenção.",
    image: styledComponentsIcon,
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
