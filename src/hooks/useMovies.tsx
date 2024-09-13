import { useQuery } from "@tanstack/react-query";
import { fetchMovies, InputFetchMovies } from "../services/tmdb_api";

// Custom hook to fetch movies with react-query
export const useMovies = ({ query, page }: InputFetchMovies) => {
  // Define a query key that includes query and page to uniquely identify the query
  const queryKey = ["movies", query, page] as const;

  const { data, error, isLoading } = useQuery({
    queryKey, // Unique key for this query
    queryFn: () => fetchMovies({ query, page }), // Function to fetch data
    placeholderData: (prev) => prev, // Keeps previous data while fetching new data
  });

  // Process data to extract necessary values
  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;
  const hasMore = page < totalPages;
  const noResults = movies.length === 0;

  // Return data and states
  return {
    movies,
    hasMore,
    loading: isLoading,
    error: error ? error.message : null,
    noResults,
  };
};
