import { useState, useEffect, useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { fetchMovies, InputFetchMovies, Movie } from "../services/tmdb_api";

// Custom hook to fetch movies with react-query
export const useMovies = ({ query, page }: InputFetchMovies) => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);

  // Fetch movies for all pages from 1 up to the current page
  const queryResults = useQueries({
    queries: Array.from({ length: page }, (_, i) => ({
      queryKey: ["movies", query, i + 1], // Fetch for pages from 1 to `page`
      queryFn: () => fetchMovies({ query, page: i + 1 }),
      staleTime: 5000,
      keepPreviousData: true, // Keep previous data when new queries are fetching
    })),
  });

  // Combine the results from all fetched pages
  useEffect(() => {
    // Ensure all queries are completed without error before updating the state
    if (queryResults.every((q) => !q.isLoading && !q.isError)) {
      const accumulatedMovies = queryResults.reduce<Movie[]>((acc, curr) => {
        if (curr.data && curr.data.results) {
          return [...acc, ...curr.data.results];
        }
        return acc;
      }, []);

      // Only update the state if the accumulatedMovies are different
      if (JSON.stringify(accumulatedMovies) !== JSON.stringify(allMovies)) {
        setAllMovies(accumulatedMovies); // Set the new accumulated movies
      }
    }
  }, [queryResults, allMovies]); // Add allMovies as a dependency to prevent unnecessary updates

  // Memoize hasMore based on total pages and the last query's data
  const hasMore = useMemo(() => {
    const lastQuery = queryResults[queryResults.length - 1]; // Get the last query result

    // Safely check if `lastQuery` and `lastQuery.data` are both defined
    return lastQuery?.data ? page < lastQuery.data.total_pages : false;
  }, [queryResults, page]);

  // Memoize noResults if the results are empty
  const noResults =
    queryResults.every((q) => !q.isLoading && !q.isError) &&
    allMovies.length === 0;

  // Determine if any query is still loading
  const isLoading = queryResults.some((q) => q.isLoading);
  const isFetching = queryResults.some((q) => q.isFetching);

  console.log("MovieData fetched");
  // Return the accumulated movies, and other states
  return {
    movies: allMovies,
    hasMore,
    loading: isLoading || isFetching,
    error: queryResults.some((q) => q.isError) ? "Error fetching movies" : null,
    noResults,
  };
};
