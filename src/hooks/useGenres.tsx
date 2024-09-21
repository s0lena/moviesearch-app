import { useQuery } from "@tanstack/react-query";
import { fetchGenres, Genre } from "../services/tmdb_api";

export const useGenres = (): Genre[] => {
  const {
    data: genres,
    error,
    isLoading,
  } = useQuery<Genre[], Error>({
    queryKey: ["genres"], // Query key
    queryFn: fetchGenres, // Query function
  });
  //Handling loading and error states
  if (isLoading) return []; // Return an empty array while loading
  if (error) return []; // Return an empty array if there's an error

  return genres || []; // Return the genres array, or an empty array if undefined
};
