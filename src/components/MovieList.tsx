import React from "react";
import styled from "styled-components";
import { Movie } from "../services/tmdb_api";
import { MovieItem } from "./MovieItem";

const MovieListContainer = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

interface MovieListProps {
  movies: Movie[];
}
export const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <MovieListContainer>
      {movies.map((movie: Movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </MovieListContainer>
  );
};
