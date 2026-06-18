export const SITE_HEADER_HEIGHT_VAR = "var(--site-header-height)";

export type MobileHeaderSection = "main" | "projects" | "logs";

export function getMobileHeaderSection(pathname: string): MobileHeaderSection {
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/log")) return "logs";
  return "main";
}

export function getMobileHeaderTitle(pathname: string): string {
  return `kelvin/${getMobileHeaderSection(pathname)}`;
}

export function getMobileHeaderHref(pathname: string): string {
  const section = getMobileHeaderSection(pathname);
  if (section === "projects") return "/projects";
  if (section === "logs") return "/log";
  return "/";
}

export function getProjectSlugFromPath(pathname: string): string | null {
  if (!pathname.startsWith("/projects/")) return null;
  const rest = pathname.slice("/projects/".length);
  if (!rest || rest.includes("/")) return null;
  return rest;
}

export function getLogSlugFromPath(pathname: string): string | null {
  if (!pathname.startsWith("/log/")) return null;
  const rest = pathname.slice("/log/".length);
  if (!rest || rest.includes("/")) return null;
  return rest;
}
