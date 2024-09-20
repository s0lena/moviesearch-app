import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Movie, fetchMovieById } from "../services/tmdb_api";
import MissingPoster from "../assets/MissingPoster.jpg";

const MovieDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
`;
const MovieItemWrapper = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 60%;
  font-size: 2vmin;
  display: flex;
  flex-direction: row;
  max-height: 60vh;
  box-sizing: content-box;
`;

const MovieData = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  justify-content: start;
  align-items: start;
  text-align: left;
`;

const MovieTitle = styled.h2`
  margin: 0;
`;

const Poster = styled.img`
  height: 30vmin;
`;

const Rating = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1vmin;
`;

const BackToListButton = styled.button`
  padding: 1vmin 2vmin;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin-bottom: 5vmin;
  font-size: calc(5px + 2vmin);

  &:hover {
    background-color: #ff6a00;
  }
`;

export const MovieDetailView: React.FC = () => {
  console.log("MovieDetailView component rendered");
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const navigate = useNavigate();

  // Fetch movie data based on ID
  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        try {
          const movieData = await fetchMovieById(id); // Fetch the movie from API
          setMovie(movieData);
        } catch (error) {
          console.error("Error fetching movie:", error);
        }
      }
    };
    fetchMovie();
  }, [id]);

  const onBackToList = () => {
    navigate(-1);
    setMovie(null);
  };

  // Handle the case where the movie is not yet loaded
  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <MovieDetailContainer>
      <MovieItemWrapper>
        <Poster
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : MissingPoster
          }
          alt={`Poster ${movie.title}`}
        />
        <MovieData>
          <MovieTitle>{movie.title}</MovieTitle>
          <p>Release date: {movie.release_date}</p>
          <p>{movie.overview}</p>
          <Rating>
            <h4>Rating:</h4>
            <h2>{movie.vote_average}</h2> based on <h4>{movie.vote_count}</h4>{" "}
            reviews
          </Rating>
        </MovieData>
      </MovieItemWrapper>
      <BackToListButton onClick={onBackToList}>Back to list</BackToListButton>
    </MovieDetailContainer>
  );
};
