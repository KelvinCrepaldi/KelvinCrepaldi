export const SITE_HEADER_HEIGHT_VAR = "var(--site-header-height)";

export function showMobileArchiveButton(pathname: string): boolean {
  return pathname !== "/";
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
