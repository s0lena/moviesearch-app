import React from "react";
import { useState } from "react";
import { Input } from "../components/Input";
import { useGenres } from "../hooks/useGenres";
import { useMovies } from "../hooks/useMovies";

export const SearchView: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const { genres } = useGenres();
  const { movies } = useMovies({ query, page });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  console.log(query, page);
  console.log(genres);
  console.log(movies);

  return (
    <>
      <Input value={query} onChange={handleInputChange} />
    </>
  );
};
