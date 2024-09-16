import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies, InputFetchMovies, Movie } from "../services/tmdb_api";

// Custom hook to fetch movies with react-query
export const useMovies = ({ query, page }: InputFetchMovies) => {
  // State to accumulate all the movies across pages
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [noResults, setNoResults] = useState<boolean>(false);

  // Define a query key that includes query and page to uniquely identify the query
  const queryKey = ["movies", query, page] as const;

  // Use `useQuery` to fetch the data
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey, // Unique key for this query
    queryFn: () => fetchMovies({ query, page }), // Function to fetch data
    staleTime: 5000, // Prevents refetching too frequently within 5 seconds
  });

  // Effect to accumulate movies as pages load
  useEffect(() => {
    if (data) {
      const newMovies =
        page === 1 ? data.results : [...allMovies, ...data.results];
      setAllMovies(newMovies);
      setHasMore(page < data.total_pages);
      setNoResults(data.results.length === 0);
    }
  }, [data, page]); // Only re-run the effect when `data` or `page` changes

  // Return the accumulated data and states
  return {
    movies: allMovies, // Return the accumulated movie list
    hasMore,
    loading: isLoading || isFetching,
    error: error ? error.message : null,
    noResults,
  };
};
