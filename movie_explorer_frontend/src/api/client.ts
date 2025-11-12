/**
 * PUBLIC_INTERFACE
 * searchMovies(query: string): Promise<Movie[]>
 * Reads base URL from REACT_APP_API_BASE; falls back to mock data if not provided.
 */
import type { Movie } from "../types/movie";

const LOG_LEVEL = (process.env.REACT_APP_LOG_LEVEL || "warn").toLowerCase();
const logDebug = (...args: any[]) => {
  if (LOG_LEVEL === "debug") {
    // eslint-disable-next-line no-console
    console.debug("[MovieExplorer]", ...args);
  }
};

const BASE_URL = process.env.REACT_APP_API_BASE?.trim() || "";
const DEFAULT_TIMEOUT_MS = 8000;

const mockMovies: Movie[] = [
  {
    id: "tt0111161",
    title: "The Shawshank Redemption",
    year: 1994,
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEt.jpg",
    rating: 9.3,
    genres: ["Drama"],
    overview:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    runtime: 142,
  },
  {
    id: "tt0068646",
    title: "The Godfather",
    year: 1972,
    posterUrl: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmYt.jpg",
    rating: 9.2,
    genres: ["Crime", "Drama"],
    overview:
      "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
    runtime: 175,
  },
  {
    id: "tt0468569",
    title: "The Dark Knight",
    year: 2008,
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcw.jpg",
    rating: 9.0,
    genres: ["Action", "Crime", "Drama"],
    overview:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    runtime: 152,
  },
  {
    id: "tt0109830",
    title: "Forrest Gump",
    year: 1994,
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTkzOTQ2NTk1NV5BMl5BanBnXkFtZTcw.jpg",
    rating: 8.8,
    genres: ["Drama", "Romance"],
    overview:
      "The presidencies of Kennedy and Johnson, the Vietnam War, Watergate and other history unfold through the perspective of an Alabama man.",
    runtime: 142,
  },
];

function toQueryString(params: Record<string, string>) {
  return Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

// PUBLIC_INTERFACE
export async function searchMovies(query: string): Promise<Movie[]> {
  const q = (query || "").trim();
  if (!BASE_URL) {
    logDebug("Using mock data (REACT_APP_API_BASE not set).");
    if (!q) return mockMovies.slice(0, 8);
    const ql = q.toLowerCase();
    return mockMovies.filter((m) => m.title.toLowerCase().includes(ql));
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const url = `${BASE_URL.replace(/\/+$/, "")}/search?${toQueryString({
      q,
    })}`;
    logDebug("Fetching:", url);
    const res = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      throw new Error(`Search failed with status ${res.status}`);
    }
    const data = await res.json();
    // Normalize results to Movie[]
    const mapped: Movie[] = (Array.isArray(data) ? data : data?.results || []).map((item: any) => ({
      id: String(item.id ?? item.imdbID ?? cryptoRandomId()),
      title: String(item.title ?? item.Name ?? "Untitled"),
      year: item.year ?? item.Year ? Number(item.year ?? item.Year) : undefined,
      posterUrl: item.posterUrl ?? item.Poster ?? item.poster ?? undefined,
      rating: typeof item.rating === "number" ? item.rating : item.imdbRating ? Number(item.imdbRating) : undefined,
      genres: Array.isArray(item.genres) ? item.genres : (item.Genre ? String(item.Genre).split(",").map((s: string) => s.trim()) : undefined),
      overview: item.overview ?? item.Plot ?? item.description ?? undefined,
      runtime: item.runtime ? Number(item.runtime) : undefined,
    }));
    return mapped;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("Search error:", err);
    // Graceful fallback to mock on error
    if (!q) return mockMovies.slice(0, 8);
    const ql = q.toLowerCase();
    return mockMovies.filter((m) => m.title.toLowerCase().includes(ql));
  } finally {
    clearTimeout(timeout);
  }
}

function cryptoRandomId(): string {
  try {
    // @ts-ignore
    const arr = new Uint8Array(8);
    // @ts-ignore
    (window.crypto || (window as any).msCrypto).getRandomValues(arr);
    return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
  } catch {
    return String(Math.random()).slice(2);
  }
}
