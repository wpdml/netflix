import React from "react";
import { useMovieGenreQuery } from "../../../hooks/useMovieGenre";

const Genre = ({ sortGenre, selectedGenre }) => {
  const { data, isLoading, isError, error } = useMovieGenreQuery();

  if (isLoading) {
    return <div>Loading...</div>; // Add a loading message or spinner
  }

  if (isError) {
    return <div className="text-xl text-red-600">{error.message}</div>;
  }

  const handleGenreChange = (event) => {
    sortGenre(event.target.value);
  };

  return (
    <div>
      <div>Genre:</div>
      <select className="" name="genre" onChange={handleGenreChange}
        value={selectedGenre}
      >
        <option value="">All Genres</option>
        {data.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};



export default Genre;
