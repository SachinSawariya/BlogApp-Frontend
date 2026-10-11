"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");
  const [mounted, setMounted] = useState(false);

  // Helper to determine system preference
  const getSystemTheme = useCallback((): ResolvedTheme => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }, []);

  const applyTheme = useCallback((targetTheme: Theme) => {
    if (typeof window === "undefined") return;

    const resolved = targetTheme === "system" ? getSystemTheme() : targetTheme;
    setResolvedTheme(resolved);

    const root = document.documentElement;
    if (resolved === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [getSystemTheme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
    } catch (e) {
      console.warn("Failed to save theme in localStorage:", e);
    }
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    // Quick toggle switches to the opposite of current resolved theme
    const nextTheme: Theme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  // Initial mount: load saved theme from localStorage
  useEffect(() => {
    setMounted(true);
    let savedTheme: Theme = "system";
    try {
      const stored = localStorage.getItem("theme") as Theme | null;
      if (stored && (stored === "light" || stored === "dark" || stored === "system")) {
        savedTheme = stored;
      }
    } catch (e) {
      console.warn("Failed to read theme from localStorage:", e);
    }

    setThemeState(savedTheme);
    applyTheme(savedTheme);

    // Watch for OS system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      const currentStored = (localStorage.getItem("theme") as Theme) || "system";
      if (currentStored === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);

    // Watch for multi-tab changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "theme") {
        const next = (e.newValue as Theme) || "system";
        setThemeState(next);
        applyTheme(next);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [applyTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme: mounted ? theme : "system",
        resolvedTheme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
