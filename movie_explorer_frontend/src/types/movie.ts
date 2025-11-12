/**
 * PUBLIC_INTERFACE
 * Movie type used across the Movie Explorer app.
 */
export type Movie = {
  id: string;
  title: string;
  year?: number;
  posterUrl?: string;
  rating?: number;
  genres?: string[];
  overview?: string;
  runtime?: number; // in minutes
};
