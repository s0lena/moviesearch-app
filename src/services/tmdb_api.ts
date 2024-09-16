import axios from "axios";

// Interfaces
export interface Genre {
  id: number;
  name: string;
}

export interface GenreResponse {
  genres: Genre[];
}

export interface InputFetchMovies {
  query: string;
  page: number;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  genre_ids: number[];
  release_date: string;
  vote_average: number;
  vote_count: number;
}

interface MoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;
const API_URL = import.meta.env.VITE_TMDB_API_URL as string;
const API_GENRE_URL = import.meta.env.VITE_TMDB_API_GENRE_URL as string;

// Fetch genres
export const fetchGenres = async (): Promise<Genre[]> => {
  try {
    const response = await axios.get<GenreResponse>(API_GENRE_URL, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw new Error("Failed to fetch genres");
  }
};

// Fetch movies
export const fetchMovies = async ({
  query,
  page,
}: InputFetchMovies): Promise<MoviesResponse> => {
  try {
    const response = await axios.get<MoviesResponse>(API_URL, {
      params: {
        query: query,
        page: page,
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
};

// Fetch movie by ID for MovieDetailView
export const fetchMovieById = async (id: string): Promise<Movie> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movie");
  }
  return response.json(); // Return the movie data
};
