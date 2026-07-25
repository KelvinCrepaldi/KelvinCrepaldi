const ptBR = {
  nav: {
    ariaMain: "Navegação principal",
    home: "HOME",
    projects: "Projetos",
    logs: "Anotações",
    about: "Sobre",
    skills: "Habilidades",
    contact: "Contato",
    sections: "Secções",
    closeMenu: "Fechar menu",
    openMenu: "Abrir menu",
    closeArchive: "Fechar índice",
    openArchive: "Abrir índice de arquivo",
  },
  language: {
    label: "Idioma",
    pt: "PT",
    en: "EN",
  },
  theme: {
    enableLight: "Ativar tema claro",
    enableDark: "Ativar tema escuro",
    light: "Tema claro",
    dark: "Tema escuro",
  },
  intro: {
    bio: "Desenvolvedor de aplicações web e desktop, do planejamento à entrega — interface, APIs, banco de dados e infraestrutura. Foco em consistência, performance e manutenção a longo prazo.",
    location: "Curitiba, Brasil",
    downloadCv: "Baixar Curriculum Vitae",
    cvLabel: "Curriculum Vitae",
  },
  projects: {
    title: "Projetos",
    subtitle: "cases e entregas selecionados da minha trajetória",
    coverAlt: "Capa do projeto {title}",
    fallbackTitle: "Projeto",
  },
  logs: {
    title: "Anotações",
    subtitle: "blog com experiências e aprendizados do dia a dia",
    seeMore: "Ver mais",
    fallbackTitle: "Log",
  },
  timeline: {
    title: "Timeline",
    subtitle: "experiência profissional e formação ao longo do tempo",
    entries: [
      {
        title: "Desenvolvedor de Software",
        subtitle: "Adam Robo",
        period: "mar. de 2024 — Atual",
        description:
          "Planejamento, arquitetura e desenvolvimento de sistemas web com React, Vite e Electron. Criação de formulários dinâmicos, componentes reutilizáveis e fluxos complexos, reduzindo o tempo de preenchimento para poucos segundos. Suporte técnico em integrações com APIs internas e sistemas offline-first. Atuação direta na definição técnica e estrutural das aplicações, incluindo organização de múltiplos módulos e tomada de decisões críticas. Atendimento simultâneo de mais de 600 clientes sem falhas, com redução de 30% no tempo de carregamento.",
      },
      {
        title: "Desenvolvimento Web Full Stack",
        subtitle: "Kenzie Academy Brasil",
        period: "mai de 2021 — jun. de 2022",
        description:
          "Curso intensivo de 2.000 horas cobrindo tecnologias Front-end e Back-end. Entre as linguagens e ferramentas: HTML5, CSS3, JavaScript (ES6+), React, Redux, Python (Django e Flask) e SQL, além de soft skills para o mercado de trabalho.",
      },
    ],
  },
  skills: {
    title: "Habilidades",
    subtitle: "tecnologias, ferramentas e habilidades do dia a dia",
    categories: {
      "01": {
        title: "Front-end",
        subtitle: "Frameworks e linguagens de interface",
      },
      "02": {
        title: "Back-end",
        subtitle: "Runtime, APIs e banco de dados",
      },
      "03": {
        title: "Ecossistema",
        subtitle: "UI, estado, i18n e base web",
      },
      "04": {
        title: "Ferramentas",
        subtitle: "IDE, versionamento, infra e produtividade",
      },
      "05": {
        title: "Metodologias & Soft Skills",
        subtitle: "Como trabalho no dia a dia",
      },
    },
    softSkills: [
      "Scrum",
      "Kanban",
      "Comunicação",
      "Proatividade",
      "Liderança",
      "Coordenação de equipe",
      "Mentoria",
      "Planejamento",
      "Adaptabilidade",
    ],
  },
  footer: {
    contact: "Contato",
    location: "Curitiba, Paraná, Brasil",
    copyright: "© 2026 Kelvin Crepaldi — Desenvolvedor de Software",
  },
  notFound: {
    title: "Página não encontrada",
    body: "O recurso solicitado não existe (ou foi movido). Você pode voltar para a home e continuar navegando pelo arquivo.",
    backHome: "Voltar para home",
  },
  archive: {
    projectsList: "Lista de projetos",
    logsList: "Lista de logs",
    volumesIndex: "Índice de volumes",
    logsIndex: "Índice de logs",
  },
  projectsPage: {
    eyebrow: "PROJETOS // VOLUME_INDEX",
    title: "Projetos",
    intro:
      "Esta seção reúne os volumes do portfólio — produtos entregues, experimentos e arquiteturas que merecem contexto além do card da home. Cada volume documenta stack, decisões e o que foi aprendido no caminho.",
  },
  logsPage: {
    eyebrow: "ANOTAÇÕES // TRANSMISSION_ARCHIVE",
    title: "Anotações",
    intro:
      "Esta seção reúne notas de campo, experiências e reflexões do dia a dia como desenvolvedor — incidentes em produção, decisões de arquitetura, aprendizados em comunidade e tudo que não cabe num case de projeto, mas vale registrar.",
  },
  scrollToTop: {
    aria: "Subir para o topo",
    label: "subir",
  },
  site: {
    description:
      "Kelvin Crepaldi — Desenvolvedor de Software | Curitiba, Brasil",
  },
};

export default ptBR;
export type Dictionary = typeof ptBR;
