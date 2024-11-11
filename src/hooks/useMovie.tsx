import { useQuery } from "@tanstack/react-query";
import { fetchMovieById, Movie } from "../services/tmdb_api";

export const useMovie = (id: string) => {
  const {
    data: movie,
    error,
    isLoading,
  } = useQuery<Movie, Error>({
    queryKey: ["movie"],
    queryFn: () => fetchMovieById(id),
  });

  if (isLoading) return undefined; // Return an empty array while loading
  if (error) return undefined; // Return an empty array if there's an error

  return movie || undefined;
};
