import type { Options } from "rehype-pretty-code";

import { portfolioDarkSyntax } from "./shiki-portfolio-dark";

/**
 * Só as cores do texto mudam por tema do site; o fundo do bloco fica em surface-container (CSS).
 * - site claro → github-light (syntax escura no creme)
 * - site escuro → portfolio-dark (syntax clara, esmeralda + creme)
 */
export const prettyCodeOptions = {
  theme: {
    light: "github-light",
    // ThemeInput do Shiki é aceite em runtime; tipos do rehype-pretty-code são mais restritos
    dark: portfolioDarkSyntax,
  },
  keepBackground: false,
  defaultLang: "plaintext",
} as Options;
