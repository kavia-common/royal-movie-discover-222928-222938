import React, { useEffect, useRef, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * SearchBar component with debounced input and accessibility features.
 */
export default function SearchBar({ onSearch, initialQuery = "" }) {
  const [value, setValue] = useState(initialQuery);
  const debounced = useDebouncedValue(value, 400);
  const inputRef = useRef(null);

  useEffect(() => {
    if (typeof onSearch === "function") {
      onSearch(debounced);
    }
  }, [debounced, onSearch]);

  useEffect(() => {
    // keyboard shortcut: / to focus search
    const handler = (e) => {
      const active = document.activeElement;
      const tag = active && active.tagName ? active.tagName.toUpperCase() : "";
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        if (inputRef.current) inputRef.current.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <label htmlFor="movie-search" className="sr-only">
        Search movies
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          id="movie-search"
          ref={inputRef}
          type="search"
          className="block w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-12 text-[var(--color-text)] placeholder-gray-400 shadow-soft focus:ring-2 focus:ring-primary focus:border-primary transition"
          placeholder="Search movies (try: Godfather, Dark Knight, Forrest Gump) — press / to focus"
          aria-label="Search movies"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {value ? (
          <button
            type="button"
            className="absolute inset-y-0 right-10 my-auto h-8 w-8 text-gray-400 hover:text-gray-600 rounded-full focus-ring"
            aria-label="Clear search"
            onClick={() => setValue("")}
          >
            ×
          </button>
        ) : null}
        <kbd className="absolute inset-y-0 right-2 my-auto h-6 px-2 inline-flex items-center rounded-md bg-gray-50 border border-gray-200 text-xs text-gray-500">
          /
        </kbd>
      </div>
    </div>
  );
}

const useDebouncedValue = (value, delayMs) => {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);
  return v;
};
