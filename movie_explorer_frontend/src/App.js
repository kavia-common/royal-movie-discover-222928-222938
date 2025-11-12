import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import "./styles/theme.css";
import "./index.css";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import LoadingSkeleton from "./components/LoadingSkeleton";
import EmptyState from "./components/EmptyState";
import ErrorBanner from "./components/ErrorBanner";
import MovieDetailModal from "./components/MovieDetailModal";
import { searchMovies } from "./api/client.js";

/**
 * PUBLIC_INTERFACE
 * App - Movie Explorer SPA with Ocean Professional theme and Tailwind styling.
 */
function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [selected, setSelected] = useState(null);

  const featureFlags = useMemo(() => {
    try {
      const raw = process.env.REACT_APP_FEATURE_FLAGS || "";
      if (!raw) return { enableDetailsModal: true };
      const parsed = JSON.parse(raw);
      return { enableDetailsModal: true, ...parsed };
    } catch {
      return { enableDetailsModal: true };
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setErrorMsg("");
      setStatus("loading");
      try {
        const res = await searchMovies(query || "");
        if (!cancelled) {
          setMovies(res);
          setStatus("success");
        }
      } catch {
        if (!cancelled) {
          setStatus("error");
          setErrorMsg("Unable to fetch movies right now. Showing fallback if available.");
        }
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [query]);

  const openDetails = (movie) => {
    if (!featureFlags.enableDetailsModal) return;
    setSelected(movie);
  };

  const closeDetails = () => setSelected(null);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 header-gradient border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-4">
            <a href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M4 4h12v12H4z" opacity="0.2" />
                  <path d="M6 6h2v8H6zM12 6h2v8h-2z" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-[var(--color-text)]">Movie Explorer</span>
            </a>
            <div className="text-xs text-gray-500">
              Ocean Professional
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <section className="text-center py-10 sm:py-12">
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]">
              Discover great movies
            </h1>
            <p className="mt-2 text-gray-600">
              Search and explore with a clean, responsive interface.
            </p>
            <div className="mt-6">
              <SearchBar onSearch={setQuery} initialQuery="" />
            </div>
          </section>

          {errorMsg && (
            <div className="mb-6">
              <ErrorBanner error={errorMsg} onClose={() => setErrorMsg("")} />
            </div>
          )}

          {/* Results area */}
          <section className="pb-16">
            {status === "loading" && <LoadingSkeleton />}
            {status === "success" && movies.length > 0 && (
              <MovieGrid movies={movies} onOpen={openDetails} />
            )}
            {status === "success" && movies.length === 0 && (
              <EmptyState />
            )}
            {status === "error" && (
              <div className="mt-6">
                <EmptyState message="We ran into an issue. Try again in a moment." />
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-xs text-gray-500 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Movie Explorer</span>
          <span>
            Theme: <span className="text-primary font-medium">Ocean Professional</span>
          </span>
        </div>
      </footer>

      {/* Details Modal */}
      {featureFlags.enableDetailsModal && (
        <MovieDetailModal movie={selected} onClose={closeDetails} />
      )}
    </div>
  );
}

export default App;
