import React from "react";

/**
 * PUBLIC_INTERFACE
 * MovieCard shows poster, title, year, rating and supports keyboard interactions.
 */
export default function MovieCard({ movie, onOpen }) {
  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen?.(movie);
    }
  };

  return (
    <article
      className="card cursor-pointer focus-ring"
      role="button"
      tabIndex={0}
      onClick={() => onOpen?.(movie)}
      onKeyDown={handleKey}
      aria-label={`View details for ${movie.title}`}
    >
      <div className="aspect-[2/3] w-full overflow-hidden rounded-t-xl bg-gray-100">
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        <img
          src={movie.posterUrl || "https://via.placeholder.com/300x450?text=No+Poster"}
          alt={`${movie.title} poster`}
          className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-[var(--color-text)] line-clamp-2">{movie.title}</h3>
        <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
          {movie.year && <span>{movie.year}</span>}
          {typeof movie.rating === "number" && (
            <span className="ml-auto inline-flex items-center gap-1 text-primary font-medium">
              <svg className="h-4 w-4 text-secondary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.803 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.803-2.036a1 1 0 00-1.175 0l-2.803 2.036c-.784.57-1.838-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
              </svg>
              {movie.rating.toFixed(1)}
            </span>
          )}
        </div>
        {movie.genres?.length ? (
          <div className="mt-2 flex flex-wrap gap-1">
            {movie.genres.slice(0, 3).map((g) => (
              <span key={g} className="badge">{g}</span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
