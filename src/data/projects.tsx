import ApiImage from "../assets/server1.svg";
import { IProject } from "@/interfaces/project.interface";

/*
export const techsData = [
  { name: "HTML5", icon: faHtml5 },
  { name: "CSS3", icon: faCss3 },
  { name: "Javascript", icon: faSquareJs },
  { name: "Typescript", icon: faSquareJs },
  { name: "React.js", icon: faReact },
  { name: "Redux", icon: faReact },

  { name: "Node.js", icon: faNodeJs },
  { name: "Flask", icon: faDatabase },
  { name: "Express", icon: faDatabase },
  { name: "Django", icon: faDatabase },
  { name: "Python", icon: faPython },
  { name: "Docker", icon: faDocker },

  { name: "Trello", icon: faTrello },
  { name: "Git", icon: faGit },

  { name: "TypeORM", icon: faMicrochip },
  { name: "MongoDB", icon: faMicrochip },
  { name: "PostgreSQL", icon: faMicrochip },
  { name: "Banco de dados SQL", icon: faMicrochip },
  { name: "GitHub", icon: faGithub },
];


{
  title: "",
  description: "",
  techs: ["", "", ""],
  repo_url: "",
  demo_url: "",
  img_print: "",
}, 
*/

export const projects: IProject[] = [
  {
    title: "Title test",
    description:
      "Projeto de Portfólio, onde eu guardo informações e projetos pessoais.",
    demoUrl: "https://doit2.vercel.app",
    repoUrl: "https://doit2.vercel.app",
    images: [
      {
        desktopImage: "https://imgur.com/w7fUZWx.jpg",
        mobileImage: "https://imgur.com/PUZoXPx.jpg",
      },
      {
        desktopImage: "https://imgur.com/uLTLgXp.jpg",
        mobileImage: "https://imgur.com/uLTLgXp.jpg",
      },
      {
        desktopImage: "https://imgur.com/8oYfQvZ.jpg",
        mobileImage: "https://imgur.com/8oYfQvZ.jpg",
      },
    ],
    type: "fullstack",
    mobile: true,
  },
  {
    title: "Title test",
    description:
      "Projeto de Portfólio, onde eu guardo informações e projetos pessoais.",
    demoUrl: "https://doit2.vercel.app",
    repoUrl: "https://doit2.vercel.app",
    images: [
      {
        desktopImage: "https://imgur.com/w7fUZWx.jpg",
        mobileImage: "https://imgur.com/PUZoXPx.jpg",
      },
      {
        desktopImage: "https://imgur.com/uLTLgXp.jpg",
        mobileImage: "https://imgur.com/uLTLgXp.jpg",
      },
      {
        desktopImage: "https://imgur.com/8oYfQvZ.jpg",
        mobileImage: "https://imgur.com/8oYfQvZ.jpg",
      },
    ],
    type: "fullstack",
    mobile: true,
  },
  {
    title: "Title test",
    description:
      "Projeto de Portfólio, onde eu guardo informações e projetos pessoais.",
    demoUrl: "https://doit2.vercel.app",
    repoUrl: "https://doit2.vercel.app",
    images: [
      {
        desktopImage: "https://imgur.com/w7fUZWx.jpg",
        mobileImage: "https://imgur.com/PUZoXPx.jpg",
      },
      {
        desktopImage: "https://imgur.com/uLTLgXp.jpg",
        mobileImage: "https://imgur.com/uLTLgXp.jpg",
      },
      {
        desktopImage: "https://imgur.com/8oYfQvZ.jpg",
        mobileImage: "https://imgur.com/8oYfQvZ.jpg",
      },
    ],
    type: "fullstack",
    mobile: true,
  },
  {
    title: "Title test",
    description:
      "Projeto de Portfólio, onde eu guardo informações e projetos pessoais.",
    demoUrl: "https://doit2.vercel.app",
    repoUrl: "https://doit2.vercel.app",
    images: [
      {
        desktopImage: "https://imgur.com/w7fUZWx.jpg",
        mobileImage: "https://imgur.com/PUZoXPx.jpg",
      },
      {
        desktopImage: "https://imgur.com/uLTLgXp.jpg",
        mobileImage: "https://imgur.com/uLTLgXp.jpg",
      },
      {
        desktopImage: "https://imgur.com/8oYfQvZ.jpg",
        mobileImage: "https://imgur.com/8oYfQvZ.jpg",
      },
    ],
    type: "fullstack",
    mobile: true,
  },
];

/* export const projectsData: IProject[] = [
  {
    title: "kelvin Crepaldi v2",
    description: "Código fonte deste website.",
    techs: ["Next.js", "tailwinds", "Vercel", "fontawesome"],
    repo_url: "https://github.com/KelvinCrepaldi/kelvincrepaldiv2",
    demo_url: "https://kelvincrepaldi.vercel.app",
    img_print: "https://i.imgur.com/8oYfQvZ.png",
    type: "front",
  },
  {
    title: "Pirate's Punch",
    description: "Ecommerce de venda de bebidas com temática pirata",
    techs: ["Next.js", "tailwinds", "Vercel", "fontawesome"],
    repo_url: "https://github.com/KelvinCrepaldi/kelvincrepaldiv2",
    demo_url: "https://kelvincrepaldi.vercel.app",
    img_print: "https://i.imgur.com/8oYfQvZ.png",
    type: "front",
  },
  {
    title: "kelvin Crepaldi v2",
    description: "Código fonte deste website.",
    techs: ["Next.js", "tailwinds", "Vercel", "fontawesome"],
    repo_url: "https://github.com/KelvinCrepaldi/kelvincrepaldiv2",
    demo_url: "https://kelvincrepaldi.vercel.app",
    img_print: "https://i.imgur.com/8oYfQvZ.png",
    type: "front",
  },
  {
    title: "PokeNext",
    description: "Biblioteca de Pokemons em Next.js e tailwind",
    techs: ["Next.js", "tailwinds", "Vercel", "fontawesome"],
    repo_url: "https://github.com/KelvinCrepaldi/pokenext",
    demo_url: "https://pokenext-nine-mu.vercel.app",
    img_print: "https://imgur.com/c03kfeM.jpg",
    type: "front",
  },
  {
    title: "VMBProject",
    description:
      "App para listar negociações de moedas digitais usando a API Mercadobitcoin.",
    techs: ["Vue.js 3", "Vuetify", "Axios", "Pinea", "Vercel", "Json"],
    repo_url: "https://github.com/KelvinCrepaldi/VMBProject",
    demo_url: "https://vmb-project.vercel.app",
    img_print: "https://imgur.com/CNeqR5O.jpg",
    type: "front",
  },
  {
    title: "Ninamartinho",
    description:
      "Projeto de Portfólio de um artista de concepts, ilustrações e jogos.",
    techs: [
      "React.js",
      "Styled Components",
      "Vercel",
      "Swiper",
      "Yup",
      "Hook Form",
      "React-Scroll",
      "fontawesome",
    ],
    repo_url: "https://github.com/KelvinCrepaldi/ninamartinho",
    demo_url: "https://ninamartinho.vercel.app",
    img_print: "https://imgur.com/ObGxsiM.jpg",
    type: "front",
  },
  {
    title: "Loginu-Api",
    description:
      "Projeto em Express de autenticação de usuário utilizando typescript",
    techs: ["Express", "Typescript", "Uuid", "Jsonwebtoken", "Dados voláteis"],
    repo_url: "https://github.com/KelvinCrepaldi/loginu-api",
    demo_url: "https://loginu-app.vercel.app",
    img_print: "",
    type: "back",
  },
  {
    title: "Eximoveisapi Gestão de Imóveis",
    description:
      "Projeto em Express.ts + TypeORM para gestão de imóveis, venda e agendamento de visitas",
    techs: [
      "Express",
      "Typescript",
      "TypeORM",
      "Docker",
      "Uuid",
      "Jsonwebtoken",
      "bcrypt",
    ],
    repo_url: "https://github.com/KelvinCrepaldi/eximoveisapi",
    demo_url:
      "https://github.com/KelvinCrepaldi/eximoveisapi/blob/main/diagrama.drawio.png",
    img_print: "",
    type: "back",
  },
  {
    title: "Le-Coffee API",
    description: "Le-Coffee é uma API para um e-commerce de cafés artesanais.",
    techs: ["Python", "Flask", "PostgreSQL", "Heroku"],
    repo_url: "https://github.com/KelvinCrepaldi/Le-Coffee-API",
    demo_url: "https://documenter.getpostman.com/view/19946807/UVsFz8tc",
    img_print: "",
    type: "back",
  },
  {
    title: "Fiado Online API",
    description:
      "API de Gerenciamento para Autônomos, ajudando a gerenciar gastos de investimentos, listas de clientes e controlar valores a receber.",
    techs: ["NodeJS", "ExpressJS", "TypeScript", "Jest", "JWT", "Docker"],
    repo_url: "https://github.com/KelvinCrepaldi/capstoneQ4-fiado-online",
    demo_url: "https://documenter.getpostman.com/view/20745940/UyrEiahn",
    img_print: "",
    type: "back",
  },
  {
    title: "HR-control API",
    description:
      "HR-control é uma API de RH feita para auxiliar os setores de recursos humanos em empresas.",
    techs: ["Python", "Django", "Docker"],
    repo_url: "https://github.com/KelvinCrepaldi/hr-control-API",
    demo_url: "https://documenter.getpostman.com/view/20745940/Uz5DocEb",
    img_print: "",
    type: "back",
  },
];
 */
