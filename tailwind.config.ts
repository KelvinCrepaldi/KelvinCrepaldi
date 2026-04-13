import type { Config } from "tailwindcss";

/** Tokens definidos em `app/globals.css` (:root e .dark) */
const rgb = (name: string) => `rgb(var(--${name}) / <alpha-value>)` as const;

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./_components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "footer-surface": rgb("footer-surface"),
        "secondary-fixed-dim": rgb("secondary-fixed-dim"),
        "primary-fixed-dim": rgb("primary-fixed-dim"),
        "on-error-container": rgb("on-error-container"),
        error: rgb("error"),
        "on-tertiary": rgb("on-tertiary"),
        "on-primary-container": rgb("on-primary-container"),
        "error-dim": rgb("error-dim"),
        "on-secondary-container": rgb("on-secondary-container"),
        "on-primary-fixed-variant": rgb("on-primary-fixed-variant"),
        "on-surface": rgb("on-surface"),
        "on-tertiary-fixed-variant": rgb("on-tertiary-fixed-variant"),
        "surface-variant": rgb("surface-variant"),
        "on-secondary-fixed-variant": rgb("on-secondary-fixed-variant"),
        "on-tertiary-container": rgb("on-tertiary-container"),
        "inverse-on-surface": rgb("inverse-on-surface"),
        "tertiary-dim": rgb("tertiary-dim"),
        "on-tertiary-fixed": rgb("on-tertiary-fixed"),
        "secondary-fixed": rgb("secondary-fixed"),
        "on-primary-fixed": rgb("on-primary-fixed"),
        "secondary-dim": rgb("secondary-dim"),
        "surface-container-highest": rgb("surface-container-highest"),
        tertiary: rgb("tertiary"),
        background: rgb("background"),
        "on-background": rgb("on-background"),
        outline: rgb("outline"),
        secondary: rgb("secondary"),
        "on-error": rgb("on-error"),
        "surface-container-low": rgb("surface-container-low"),
        "inverse-surface": rgb("inverse-surface"),
        "surface-tint": rgb("surface-tint"),
        "surface-container": rgb("surface-container"),
        "primary-container": rgb("primary-container"),
        "on-secondary": rgb("on-secondary"),
        "primary-fixed": rgb("primary-fixed"),
        "secondary-container": rgb("secondary-container"),
        "on-surface-variant": rgb("on-surface-variant"),
        surface: rgb("surface"),
        "primary-dim": rgb("primary-dim"),
        "tertiary-container": rgb("tertiary-container"),
        "inverse-primary": rgb("inverse-primary"),
        "surface-container-lowest": rgb("surface-container-lowest"),
        primary: rgb("primary"),
        "surface-container-high": rgb("surface-container-high"),
        "error-container": rgb("error-container"),
        "on-primary": rgb("on-primary"),
        "tertiary-fixed-dim": rgb("tertiary-fixed-dim"),
        "on-secondary-fixed": rgb("on-secondary-fixed"),
        "tertiary-fixed": rgb("tertiary-fixed"),
        "outline-variant": rgb("outline-variant"),
        "surface-bright": rgb("surface-bright"),
        "surface-dim": rgb("surface-dim"),
      },
      fontFamily: {
        "space-grotesk": ["var(--font-space-grotesk)", "sans-serif"],
        headline: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-space-grotesk)", "sans-serif"],
        label: ["var(--font-space-grotesk)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0px",
        lg: "0px",
        xl: "0px",
        full: "0px",
      },
      keyframes: {
        "spin-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
      },
      animation: {
        "spin-reverse": "spin-reverse 90s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
