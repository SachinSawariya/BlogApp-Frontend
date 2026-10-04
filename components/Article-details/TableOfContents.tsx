"use client";

import React, { useState, useEffect } from "react";
import { FiList, FiChevronDown, FiChevronUp, FiCornerDownRight } from "react-icons/fi";
import { HeadingItem } from "@/utils/contentProcessor";

interface TableOfContentsProps {
  headings: HeadingItem[];
  variant?: "inline" | "sidebar";
}

export default function TableOfContents({ headings, variant = "inline" }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined" || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length < 2) {
    return null;
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  if (variant === "sidebar") {
    return (
      <div className="group">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2.5 bg-blue-50/50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            <FiList className="w-5 h-5 text-blue-600 group-hover:text-white" />
          </div>
          <h4 className="font-extrabold text-gray-800 text-sm uppercase tracking-widest">
            On This Page
          </h4>
        </div>
        <nav aria-label="Table of contents" className="space-y-1.5 max-h-[360px] overflow-y-auto pr-2">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => handleLinkClick(e, heading.id)}
                className={`block text-sm py-1.5 transition-all duration-200 border-l-2 ${
                  heading.level === 3 ? "pl-5 text-[13px]" : "pl-3 font-semibold"
                } ${
                  isActive
                    ? "border-blue-600 text-blue-600 font-bold bg-blue-50/40 rounded-r-lg"
                    : "border-gray-100 text-gray-600 hover:border-gray-300 hover:text-gray-900"
                }`}
              >
                {heading.text}
              </a>
            );
          })}
        </nav>
      </div>
    );
  }

  // Inline variant (embedded at top of article content)
  return (
    <nav
      aria-label="Table of contents"
      className="mb-10 bg-gradient-to-br from-blue-50/60 via-indigo-50/30 to-purple-50/40 rounded-3xl border border-blue-100/80 p-6 md:p-8 backdrop-blur-sm shadow-[0_4px_20px_rgba(59,130,246,0.04)]"
    >
      <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
            <FiList className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-gray-900 text-lg md:text-xl tracking-tight">
              Table of Contents
            </h3>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {headings.length} sections in this article
            </p>
          </div>
        </div>

        <button
          type="button"
          className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-white/80 transition-all"
          aria-label={isOpen ? "Collapse table of contents" : "Expand table of contents"}
        >
          {isOpen ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <ol className="mt-6 pt-5 border-t border-blue-100/60 space-y-2.5 list-none">
          {headings.map((heading, index) => {
            const isActive = activeId === heading.id;
            return (
              <li
                key={heading.id}
                className={`transition-all ${heading.level === 3 ? "ml-6 text-sm" : "text-base font-semibold"}`}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleLinkClick(e, heading.id)}
                  className={`group flex items-start gap-2.5 py-1 px-2.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 font-bold"
                      : "text-gray-700 hover:text-blue-600 hover:bg-white/70"
                  }`}
                >
                  {heading.level === 3 ? (
                    <FiCornerDownRight
                      className={`w-4 h-4 mt-0.5 shrink-0 transition-colors ${
                        isActive ? "text-white" : "text-gray-400 group-hover:text-blue-500"
                      }`}
                    />
                  ) : (
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                        isActive ? "bg-white/20 text-white" : "bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white"
                      }`}
                    >
                      {index + 1}
                    </span>
                  )}
                  <span className="leading-snug">{heading.text}</span>
                </a>
              </li>
            );
          })}
        </ol>
      )}
    </nav>
  );
}
