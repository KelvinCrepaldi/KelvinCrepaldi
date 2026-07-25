import type { Dictionary } from "./pt-BR";

const en: Dictionary = {
  nav: {
    ariaMain: "Main navigation",
    home: "HOME",
    projects: "Projects",
    logs: "Notes",
    about: "About",
    skills: "Skills",
    contact: "Contact",
    sections: "Sections",
    closeMenu: "Close menu",
    openMenu: "Open menu",
    closeArchive: "Close index",
    openArchive: "Open archive index",
  },
  language: {
    label: "Language",
    pt: "PT",
    en: "EN",
  },
  theme: {
    enableLight: "Switch to light theme",
    enableDark: "Switch to dark theme",
    light: "Light theme",
    dark: "Dark theme",
  },
  intro: {
    bio: "Web and desktop application developer, from planning to delivery — UI, APIs, databases, and infrastructure. Focused on consistency, performance, and long-term maintainability.",
    location: "Curitiba, Brazil",
    downloadCv: "Download Curriculum Vitae",
    cvLabel: "Curriculum Vitae",
  },
  projects: {
    title: "Projects",
    subtitle: "selected cases and deliveries from my career",
    coverAlt: "Cover for project {title}",
    fallbackTitle: "Project",
  },
  logs: {
    title: "Notes",
    subtitle: "a blog of day-to-day experiences and learnings",
    seeMore: "See more",
    fallbackTitle: "Log",
  },
  timeline: {
    title: "Timeline",
    subtitle: "professional experience and education over time",
    entries: [
      {
        title: "Software Developer",
        subtitle: "Adam Robo",
        period: "Mar 2024 — Present",
        description:
          "Planning, architecture, and development of web systems with React, Vite, and Electron. Building dynamic forms, reusable components, and complex flows that cut fill-out time down to a few seconds. Technical support for integrations with internal APIs and offline-first systems. Direct involvement in technical and structural decisions across applications, including multi-module organization and critical trade-offs. Serving 600+ clients simultaneously without outages, with a 30% reduction in load time.",
      },
      {
        title: "Full Stack Web Development",
        subtitle: "Kenzie Academy Brasil",
        period: "May 2021 — Jun. 2022",
        description:
          "Intensive 2,000-hour program covering front-end and back-end technologies. Languages and tools included HTML5, CSS3, JavaScript (ES6+), React, Redux, Python (Django and Flask), and SQL, plus soft skills for the job market.",
      },
    ],
  },
  skills: {
    title: "Skills",
    subtitle: "technologies, tools, and day-to-day abilities",
    categories: {
      "01": {
        title: "Front-end",
        subtitle: "UI frameworks and languages",
      },
      "02": {
        title: "Back-end",
        subtitle: "Runtime, APIs, and databases",
      },
      "03": {
        title: "Ecosystem",
        subtitle: "UI, state, i18n, and web fundamentals",
      },
      "04": {
        title: "Tools",
        subtitle: "IDE, version control, infra, and productivity",
      },
      "05": {
        title: "Methodologies & Soft Skills",
        subtitle: "How I work day to day",
      },
    },
    softSkills: [
      "Scrum",
      "Kanban",
      "Communication",
      "Proactivity",
      "Leadership",
      "Team coordination",
      "Mentoring",
      "Planning",
      "Adaptability",
    ],
  },
  footer: {
    contact: "Contact",
    location: "Curitiba, Paraná, Brazil",
    copyright: "© 2026 Kelvin Crepaldi — Software Developer",
  },
  notFound: {
    title: "Page not found",
    body: "The requested resource does not exist (or was moved). You can go back home and keep browsing the archive.",
    backHome: "Back to home",
  },
  archive: {
    projectsList: "Project list",
    logsList: "Log list",
    volumesIndex: "Volume index",
    logsIndex: "Log index",
  },
  projectsPage: {
    eyebrow: "PROJECTS // VOLUME_INDEX",
    title: "Projects",
    intro:
      "This section gathers the portfolio volumes — shipped products, experiments, and architectures that deserve more context than a home card. Each volume documents stack, decisions, and what was learned along the way.",
  },
  logsPage: {
    eyebrow: "NOTES // TRANSMISSION_ARCHIVE",
    title: "Notes",
    intro:
      "This section gathers field notes, experiences, and day-to-day reflections as a developer — production incidents, architecture decisions, community learnings, and everything that does not fit a project case but is still worth recording.",
  },
  scrollToTop: {
    aria: "Scroll to top",
    label: "top",
  },
  site: {
    description:
      "Kelvin Crepaldi — Software Developer | Curitiba, Brazil",
  },
};

export default en;
