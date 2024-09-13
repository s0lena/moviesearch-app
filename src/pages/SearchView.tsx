import React from "react";
import { useState } from "react";
import { Input } from "../components/Input";

export const SearchView: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  return (
    <>
      <Input value={query} onChange={handleInputChange} />
    </>
  );
};
