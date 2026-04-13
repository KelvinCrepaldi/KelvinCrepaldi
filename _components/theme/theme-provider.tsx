"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function syncDom(next: Theme) {
  document.documentElement.classList.toggle("dark", next === "dark");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
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

  useEffect(() => {
    const stored = readUserPreference();
    const resolved = stored ?? getSystemTheme();
    setThemeState(resolved);
    syncDom(resolved);
    setReady(true);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (readUserPreference() !== null) return;
      const next = getSystemTheme();
      setThemeState(next);
      syncDom(next);
    };
    mq.addEventListener("change", onSystemChange);
    return () => mq.removeEventListener("change", onSystemChange);
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
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
