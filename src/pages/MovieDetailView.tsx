import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import styled from "styled-components";
import MissingPoster from "../assets/MissingPoster.jpg";
import { useGenres } from "../hooks/useGenres";
import { Genre } from "../services/tmdb_api";
import { useMovie } from "../hooks/useMovie";

// Styled components as before
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
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const genres: Genre[] = useGenres();

  const movie = id ? useMovie(id) : undefined;

  const genreNames = useMemo(
    () =>
      movie?.genre_ids?.map((id: number) => {
        const genre = genres.find((g: Genre) => g.id === id);
        return genre ? genre.name : "Unknown";
      }) || [],
    [movie?.genre_ids, genres]
  );

  if (!id || !movie) {
    return (
      <MovieDetailContainer>
        <h2>Movie details not available</h2>
        <BackToListButton onClick={() => navigate("/")}>
          Back to search
        </BackToListButton>
      </MovieDetailContainer>
    );
  }

  const onBackToList = () => {
    navigate(-1);
  };

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
          <h4>Genres: {genreNames.join(", ")}</h4>
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

// Fetch movie data based on ID
// const { id } = useParams<{ id: string }>();
// useEffect(() => {
//   const fetchMovie = async () => {
//     if (id) {
//       try {
//         const movieData = await fetchMovieById(id); // Fetch the movie from API
//         setMovie(movieData);
//       } catch (error) {
//         console.error("Error fetching movie:", error);
//       }
//     }
//   };
//   fetchMovie();
// }, [id]);

// const onBackToList = () => {
//   navigate(-1);
//   setMovie(null);
// };

// // Handle the case where the movie is not yet loaded
// if (!movie) {
//   return <div>Loading...</div>;
// }

// return (
//   <MovieDetailContainer>
//     <MovieItemWrapper>
//       <Poster
//         src={
//           movie.poster_path
//             ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
//             : MissingPoster
//         }
//         alt={`Poster ${movie.title}`}
//       />
//       <MovieData>
//         <MovieTitle>{movie.title}</MovieTitle>
//         <p>Release date: {movie.release_date}</p>
//         <p>{movie.overview}</p>
//         <Rating>
//           <h4>Rating:</h4>
//           <h2>{movie.vote_average}</h2> based on <h4>{movie.vote_count}</h4>{" "}
//           reviews
//         </Rating>
//       </MovieData>
//     </MovieItemWrapper>
//     <BackToListButton onClick={onBackToList}>Back to list</BackToListButton>
//   </MovieDetailContainer>
// );
