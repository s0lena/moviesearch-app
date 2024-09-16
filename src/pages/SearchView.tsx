import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
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
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [movieSelected, setMovieSelected] = useState<Movie | null>(null);
  const { movies, hasMore, noResults } = useMovies({ query, page });
  const navigate = useNavigate();

  // Load the saved state from sessionStorage
  useEffect(() => {
    const savedQuery = sessionStorage.getItem("query");
    const savedPage = sessionStorage.getItem("page");

    if (savedQuery) {
      setQuery(savedQuery);
    }
    if (savedPage) {
      setPage(Number(savedPage));
    }
  }, []);

  // Save the state to sessionStorage when query or page changes
  useEffect(() => {
    sessionStorage.setItem("query", query);
    sessionStorage.setItem("page", page.toString());
  }, [query, page]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevpage) => prevpage + 1);
  };

  const handleMovieSelected = (movie: Movie) => {
    setMovieSelected(movie);
  };

  // Side effect to navigate when a movie is selected
  useEffect(() => {
    if (movieSelected) {
      // Use navigate to redirect to the movie detail view
      navigate(`/movie/${movieSelected.id}`);
    }
  }, [movieSelected, navigate]);

  // When navigating back, clear the selected movie
  useEffect(() => {
    if (!movieSelected) {
      // Restore the page state when the movie is deselected
      const savedQuery = sessionStorage.getItem("query");
      const savedPage = sessionStorage.getItem("page");

      if (savedQuery) {
        setQuery(savedQuery);
      }
      if (savedPage) {
        setPage(Number(savedPage));
      }
    }
  }, [movieSelected]);

  return (
    <>
      <Input value={query} onChange={handleInputChange} />
      <MovieList movies={movies} onClick={handleMovieSelected} />
      {hasMore && (
        <LoadMoreButton onClick={handleLoadMore}>Load more</LoadMoreButton>
      )}
      {noResults && (
        <Message>
          Oops, there`s no movie to match your Search...Try again!
        </Message>
      )}
    </>
  );
};
