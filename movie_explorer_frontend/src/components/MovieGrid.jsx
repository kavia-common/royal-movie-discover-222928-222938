import React from "react";
import MovieCard from "./MovieCard";

/**
 * PUBLIC_INTERFACE
 * MovieGrid lays out movie cards in a responsive grid.
 */
export default function MovieGrid({ movies, onOpen }) {
  return (
    <section
      aria-label="Search results"
      className="grid gap-6 sm:gap-7 md:gap-8"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
    >
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} onOpen={onOpen} />
      ))}
    </section>
  );
}
