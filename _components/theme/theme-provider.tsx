"use client";

import { MotionConfig } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

/** Só é escrito quando o utilizador escolhe manualmente (toggle). */
export const THEME_STORAGE_KEY = "kelvin-portfolio-theme-user";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  /** true após sincronizar tema no cliente */
  ready: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readUserPreference(): Theme | null {
  try {
    const s = localStorage.getItem(THEME_STORAGE_KEY);
    if (s === "dark" || s === "light") return s;
    return null;
  } catch {
    return null;
  }
}

const DEFAULT_THEME: Theme = "dark";

function syncDom(next: Theme) {
  document.documentElement.classList.toggle("dark", next === "dark");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [ready, setReady] = useState(false);

  const applyUserTheme = useCallback((next: Theme) => {
    setThemeState(next);
    syncDom(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useLayoutEffect(() => {
    const resolved = readUserPreference() ?? DEFAULT_THEME;
    setThemeState(resolved);
    syncDom(resolved);
    setReady(true);
  }, []);

  const setTheme = useCallback(
    (next: Theme) => {
      applyUserTheme(next);
    },
    [applyUserTheme],
  );

  const toggleTheme = useCallback(() => {
    applyUserTheme(theme === "light" ? "dark" : "light");
  }, [applyUserTheme, theme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, ready }),
    [theme, setTheme, toggleTheme, ready],
  );

  return (
    <MotionConfig reducedMotion="user">
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </MotionConfig>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
