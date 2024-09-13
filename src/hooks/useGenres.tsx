import { useQuery } from "@tanstack/react-query";
import { fetchGenres, Genre } from "../services/tmdb_api";

export const useGenres = () => {
  const {
    data: genres,
    error,
    isLoading,
  } = useQuery<Genre[], Error>({
    queryKey: ["genres"], // Query key
    queryFn: fetchGenres, // Query function
  });
  return { genres, error, isLoading };
};
