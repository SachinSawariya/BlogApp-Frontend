"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiSun, FiMoon, FiMonitor, FiCheck } from "react-icons/fi";
import { useTheme, type Theme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  variant?: "icon-only" | "dropdown" | "mobile";
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = "dropdown",
  className = "",
}) => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse ${className}`} />
    );
  }

  // Mobile list row variant
  if (variant === "mobile") {
    return (
      <div className={`py-2 px-3 rounded-xl bg-gray-100/70 dark:bg-gray-800/80 ${className}`}>
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 block">
          Appearance
        </span>
        <div className="grid grid-cols-3 gap-1 bg-white dark:bg-gray-900 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-medium transition-all ${
              theme === "light"
                ? "bg-blue-600 text-white shadow-sm font-semibold"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <FiSun className="w-3.5 h-3.5" />
            Light
          </button>
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-medium transition-all ${
              theme === "dark"
                ? "bg-blue-600 text-white shadow-sm font-semibold"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <FiMoon className="w-3.5 h-3.5" />
            Dark
          </button>
          <button
            type="button"
            onClick={() => setTheme("system")}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-medium transition-all ${
              theme === "system"
                ? "bg-blue-600 text-white shadow-sm font-semibold"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <FiMonitor className="w-3.5 h-3.5" />
            Auto
          </button>
        </div>
      </div>
    );
  }

  // Quick 1-click icon toggle
  if (variant === "icon-only") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
        className={`p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${className}`}
      >
        {resolvedTheme === "dark" ? (
          <FiSun className="w-5 h-5 text-amber-400 transition-transform hover:rotate-45" />
        ) : (
          <FiMoon className="w-5 h-5 text-indigo-600 transition-transform hover:-rotate-12" />
        )}
      </button>
    );
  }

  // Dropdown variant (default for navbar)
  const options: { id: Theme; label: string; icon: React.ReactNode }[] = [
    { id: "light", label: "Light", icon: <FiSun className="w-4 h-4 text-amber-500" /> },
    { id: "dark", label: "Dark", icon: <FiMoon className="w-4 h-4 text-indigo-400" /> },
    { id: "system", label: "System", icon: <FiMonitor className="w-4 h-4 text-blue-500" /> },
  ];

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Theme selector"
        aria-expanded={isOpen}
        className="p-2 rounded-full border border-gray-200 dark:border-gray-700/80 bg-gray-50/80 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        {resolvedTheme === "dark" ? (
          <FiMoon className="w-4 h-4 text-indigo-400" />
        ) : (
          <FiSun className="w-4 h-4 text-amber-500" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-900/10 dark:shadow-black/50 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Theme
          </div>
          {options.map((opt) => {
            const isSelected = theme === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setTheme(opt.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  {opt.icon}
                  <span>{opt.label}</span>
                </div>
                {isSelected && <FiCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
