/**
 * JS wrapper to re-export TS client for CRA without TypeScript config.
 * Avoids build failures when importing .ts directly in JS files.
 */
export * from "./client.ts";
