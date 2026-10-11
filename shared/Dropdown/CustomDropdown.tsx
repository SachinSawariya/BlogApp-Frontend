"use client";

import { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";

interface Option {
  id: string;
  name: string;
}

interface CustomDropdownProps {
  id?: string;
  options: Option[];
  value: string;
  onChange: (id: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const CustomDropdown = ({
  id,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  icon,
  className = ""
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.id === value);

  return (
    <div className={`relative group ${className}`} ref={dropdownRef}>
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors z-10 pointer-events-none">
          {icon}
        </div>
      ) }
      
      <div 
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full ${icon ? 'pl-12' : 'pl-6'} pr-12 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border-2 transition-all font-bold cursor-pointer flex items-center justify-between ${
          isOpen 
            ? 'border-blue-500 bg-white dark:bg-gray-800 ring-4 ring-blue-500/10 shadow-xl shadow-blue-500/5' 
            : 'border-transparent dark:border-gray-700/60 hover:bg-gray-100/50 dark:hover:bg-gray-800'
        }`}
      >
        <span className={selectedOption ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}>
          {selectedOption ? selectedOption.name : placeholder}
        </span>
        <FiChevronDown 
          className={`transition-transform duration-300 text-gray-400 dark:text-gray-400 ${isOpen ? 'rotate-180 text-blue-500 dark:text-blue-400' : ''}`}
          size={20}
          strokeWidth={3}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700/80 overflow-hidden z-[60] animate-in slide-in-from-top-2 duration-200">
          <div className="max-h-60 overflow-y-auto p-2 custom-scrollbar">
            {options.map((opt) => (
              <div
                key={opt.id}
                onClick={() => {
                  onChange(opt.id);
                  setIsOpen(false);
                }}
                className={`px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center justify-between group/item ${
                  value === opt.id 
                    ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {opt.name}
                {value === opt.id && <FiCheck size={18} />}
              </div>
            ))}
            {options.length === 0 && (
              <div className="px-4 py-8 text-center text-gray-400 dark:text-gray-500 text-sm font-medium">
                No options available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
