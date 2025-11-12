import React, { useEffect, useRef } from "react";

/**
 * PUBLIC_INTERFACE
 * MovieDetailModal shows details, traps focus, ESC to close, accessible structure.
 */
export default function MovieDetailModal({ movie, onClose }) {
  const backdropRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
      if (e.key === "Tab") {
        const focusables = getFocusables();
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    setTimeout(() => {
      const first = getFocusables()[0];
      first?.focus();
    }, 0);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFocusables = () => {
    const container = backdropRef.current;
    if (!container) return [];
    return Array.from(
      container.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")
    ).filter((el) => !el.hasAttribute("disabled"));
  };

  if (!movie) return null;

  const onBackdrop = (e) => {
    if (e.target === backdropRef.current) onClose?.();
  };

  return (
    <div
      ref={backdropRef}
      onMouseDown={onBackdrop}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 animate-fade-in"
      aria-labelledby="movie-detail-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="max-w-3xl w-full rounded-2xl bg-white shadow-xl overflow-hidden animate-scale-in">
        <div className="grid grid-cols-1 sm:grid-cols-[240px,1fr]">
          <div className="bg-gray-100">
            <img
              src={movie.posterUrl || "https://via.placeholder.com/300x450?text=No+Poster"}
              alt={`${movie.title} poster`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between gap-3">
              <h2 id="movie-detail-title" className="text-xl font-semibold text-[var(--color-text)]">
                {movie.title}
              </h2>
              <button
                onClick={onClose}
                className="rounded-md text-gray-500 hover:text-gray-700 focus-ring"
                aria-label="Close details"
              >
                ✕
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span>{movie.year ?? "—"}</span>
              {typeof movie.runtime === "number" && <span className="ml-2">• {movie.runtime} min</span>}
            </div>
            {movie.genres?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {movie.genres.map((g) => (
                  <span key={g} className="badge">{g}</span>
                ))}
              </div>
            ) : null}
            {movie.overview && <p className="mt-4 text-gray-700">{movie.overview}</p>}
            {typeof movie.rating === "number" && (
              <div className="mt-4 inline-flex items-center gap-2 text-primary font-medium">
                <svg className="h-5 w-5 text-secondary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.803 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.803-2.036a1 1 0 00-1.175 0l-2.803 2.036c-.784.57-1.838-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
                </svg>
                {movie.rating.toFixed(1)}
              </div>
            )}
            <div className="mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-blue-600 focus-ring"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
