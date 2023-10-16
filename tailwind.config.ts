import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "kc-blue": "#1A202C",
      },
      fontFamily: {
        jetbrains: ["var(--jetbrains)"],
        "roboto-mono": ["var(--roboto-mono)"],
        oxygen: ["var(--oxygen)"],
      },
      aspectRatio: {
        desktop: "16 / 9",
        mobile: "9 / 16",
      },
    },
  },
  plugins: [],
};
export default config;
