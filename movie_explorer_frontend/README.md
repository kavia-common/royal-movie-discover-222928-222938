# Movie Explorer Frontend (Ocean Professional Theme)

A modern, responsive React web app for discovering movies. Includes search with debounced input, responsive results grid, modal details, accessibility, and Tailwind CSS with the Ocean Professional palette.

## Quick Start

- Requirements: Node.js 16+ recommended
- Install dependencies:
  - npm install
- Start the dev server (port 3000):
  - npm start
- Build for production:
  - npm run build
- Run tests:
  - npm test

Open http://localhost:3000 to view the app.

## Environment Variables

Create a `.env` (see `.env.example`):

- REACT_APP_API_BASE: Base URL for movie search API (e.g., https://api.example.com). If not set, the app will use a mock data provider so you can still see results.
- REACT_APP_FEATURE_FLAGS: JSON string for feature toggles, e.g. {"enableDetailsModal": true}
- REACT_APP_LOG_LEVEL: debug | info | warn (default warn). Only minimal debug logs are printed and only when set to debug.

Other variables present in the environment are not required for this app but may be used by hosting infrastructure.

## Features

- Tailwind CSS with Ocean Professional theme:
  - Primary #2563EB, Secondary #F59E0B, Error #EF4444, Background #f9fafb, Text #111827
- Components:
  - SearchBar, MovieGrid, MovieCard, MovieDetailModal, LoadingSkeleton, EmptyState, ErrorBanner
- Accessibility:
  - ARIA labels for search and alerts, keyboard focus trap in modal, alt text for posters, keyboard navigation on cards (Enter/Space)
- API client with graceful fallback:
  - src/api/client.ts reads REACT_APP_API_BASE and uses fetch with timeout (AbortController)
  - Falls back to curated mock data when API base is missing or request fails

## Project Structure

- src/components/* — UI components
- src/api/client.ts — API client and mock provider
- src/types/movie.ts — Movie type definition
- tailwind.config.js — Theme configuration
- postcss.config.js — Tailwind/PostCSS
- src/styles/theme.css — Utility theme classes
- src/index.css — Tailwind layers + global styles

## Notes

- No secrets are hardcoded. Configure runtime URLs via environment variables.
- The app preserves the default CRA start script; it runs on port 3000 as required.
