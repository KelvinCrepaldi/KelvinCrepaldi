import type { ThemeInput } from "shiki";

/**
 * Syntax no dark mode — tokens claros sobre surface-container oliva.
 * Paleta alinhada ao site: creme (#fef9ed), esmeralda terminal (#34d399), tons quentes.
 */
export const portfolioDarkSyntax: ThemeInput = {
  name: "portfolio-dark",
  type: "dark",
  colors: {
    "editor.foreground": "#e8e6dc",
    "editor.background": "#00000000",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#9a9580", fontStyle: "italic" },
    },
    {
      scope: [
        "keyword",
        "storage.type",
        "storage.modifier",
        "keyword.control",
        "keyword.operator.new",
        "keyword.other",
      ],
      settings: { foreground: "#34d399" },
    },
    {
      scope: [
        "string",
        "string.quoted",
        "string.template",
        "constant.other.symbol",
      ],
      settings: { foreground: "#e8c99a" },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call",
        "entity.name.method",
      ],
      settings: { foreground: "#7dd3fc" },
    },
    {
      scope: [
        "entity.name.type",
        "support.type",
        "support.class",
        "entity.name.class",
        "entity.other.inherited-class",
      ],
      settings: { foreground: "#d4c4b0" },
    },
    {
      scope: ["variable", "variable.other", "variable.parameter", "meta.definition.variable"],
      settings: { foreground: "#fef9ed" },
    },
    {
      scope: ["constant.numeric", "constant.language", "constant.character"],
      settings: { foreground: "#f0ab6e" },
    },
    {
      scope: ["entity.name.tag", "punctuation.definition.tag"],
      settings: { foreground: "#34d399" },
    },
    {
      scope: ["punctuation", "meta.brace", "punctuation.section"],
      settings: { foreground: "#b8b29a" },
    },
    {
      scope: ["keyword.operator", "keyword.control.flow"],
      settings: { foreground: "#d4cfc0" },
    },
    {
      scope: ["invalid", "invalid.illegal"],
      settings: { foreground: "#f2786a" },
    },
  ],
};
