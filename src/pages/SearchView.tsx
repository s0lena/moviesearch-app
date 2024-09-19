import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { useMovies } from "../hooks/useMovies";
import { MovieList } from "../components/MovieList";
import { Movie } from "../services/tmdb_api";

const LoadMoreButton = styled.button`
  padding: 2vmin 3vmin;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin-bottom: 5vmin;
  font-size: calc(10px + 2vmin);

  &:hover {
    background-color: #ff6a00;
  }
`;

const Message = styled.p`
  font-weight: bold;
  display: block;
  margin: calc(10px + 2vmin);
  font-size: calc(10px + 2vmin);
`;

export const SearchView: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [movieSelected, setMovieSelected] = useState<Movie | null>(null);

  const { movies, hasMore, noResults } = useMovies({ query, page });

  // Restore saved query and page on component mount
  useEffect(() => {
    const savedQuery = sessionStorage.getItem("query");
    const savedPage = sessionStorage.getItem("page");

    if (savedQuery) setQuery(savedQuery);
    if (savedPage) setPage(Number(savedPage));
  }, []);

  // Handle input change and reset page if query changes
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      if (newQuery !== query) {
        setQuery(newQuery);
        setPage(1); // Reset to page 1 when a new query is entered
      }
    },
    [query]
  );

  // Handle movie selection and save scroll position before navigating away
  const handleMovieSelected = useCallback(
    (movie: Movie) => {
      // Save the current query and page before navigating away
      sessionStorage.setItem("query", query);
      sessionStorage.setItem("page", page.toString());

      setMovieSelected(movie);
      navigate(`/movie/${movie.id}`); // Navigate to the movie detail view
    },
    [query, page, navigate]
  );

  // Handle loading more pages
  const handleLoadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  return (
    <>
      <Input value={query} onChange={handleInputChange} />
      <MovieList movies={movies} onClick={handleMovieSelected} />
      {hasMore && (
        <LoadMoreButton onClick={handleLoadMore}>Load more</LoadMoreButton>
      )}
      {noResults && query.length !== 0 ? (
        <Message>
          Oops, there's no movie to match your search... Try again!
        </Message>
      ) : null}
    </>
  );
};

// import React, { useState, useEffect, useCallback } from "react";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import { Input } from "../components/Input";
// import { useMovies } from "../hooks/useMovies";
// import { MovieList } from "../components/MovieList";
// import { Movie } from "../services/tmdb_api";

// const LoadMoreButton = styled.button`
//   padding: 2vmin 3vmin;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 25px;
//   cursor: pointer;
//   margin-bottom: 5vmin;
//   font-size: calc(10px + 2vmin);

//   &:hover {
//     background-color: #ff6a00;
//   }
// `;

// const Message = styled.p`
//   font-weight: bold;
//   display: block;
//   margin: calc(10px + 2vmin);
//   font-size: calc(10px + 2vmin);
// `;

// export const SearchView: React.FC = () => {
//   const navigate = useNavigate();
//   const [query, setQuery] = useState<string>("");
//   const [page, setPage] = useState<number>(1);
//   const [movieSelected, setMovieSelected] = useState<Movie | null>(null);

//   const { movies, hasMore, noResults } = useMovies({ query, page });

//   // Restore saved query and page on component mount
//   useEffect(() => {
//     const savedQuery = sessionStorage.getItem("query");
//     const savedPage = sessionStorage.getItem("page");

//     if (savedQuery) setQuery(savedQuery);
//     if (savedPage) setPage(Number(savedPage));
//   }, []);

//   // Handle input change and reset page if query changes
//   const handleInputChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const newQuery = e.target.value;
//       if (newQuery !== query) {
//         setQuery(newQuery);
//         setPage(1); // Reset to page 1 when a new query is entered
//       }
//     },
//     [query]
//   );

//   // Handle movie selection and save scroll position before navigating away
//   const handleMovieSelected = useCallback(
//     (movie: Movie) => {
//       // Save the current query and page before navigating away
//       sessionStorage.setItem("query", query);
//       sessionStorage.setItem("page", page.toString());

//       setMovieSelected(movie);
//       navigate(`/movie/${movie.id}`); // Navigate to the movie detail view
//     },
//     [query, page, navigate]
//   );

//   // Handle loading more pages
//   const handleLoadMore = useCallback(() => {
//     setPage((prevPage) => prevPage + 1);
//   }, []);

//   return (
//     <>
//       <Input value={query} onChange={handleInputChange} />
//       <MovieList movies={movies} onClick={handleMovieSelected} />
//       {hasMore && (
//         <LoadMoreButton onClick={handleLoadMore}>Load more</LoadMoreButton>
//       )}
//       {noResults && query.length !== 0 ? (
//         <Message>
//           Oops, there's no movie to match your search... Try again!
//         </Message>
//       ) : null}
//     </>
//   );
// };
