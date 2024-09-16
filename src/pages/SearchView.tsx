import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { Input } from "../components/Input";
// import { useGenres } from "../hooks/useGenres";
import { useMovies } from "../hooks/useMovies";
import { MovieList } from "../components/MovieList";

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

export const SearchView: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  // const { genres } = useGenres();
  const { movies, hasMore, noResults } = useMovies({ query, page });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevpage) => prevpage + 1);
  };

  return (
    <>
      <Input value={query} onChange={handleInputChange} />
      <MovieList movies={movies} />
      {hasMore && (
        <LoadMoreButton onClick={handleLoadMore}>Load more</LoadMoreButton>
      )}
    </>
  );
};
