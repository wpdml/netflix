import React, { useState } from "react";
import { useMovieGenreQuery } from "../../../hooks/useMovieGenre";
import { Alert } from "react-bootstrap";
import { ClipLoader } from "react-spinners";

const Genre = ({ sortGenre, selectedGenre }) => {
  const { data, isLoading, isError, error } = useMovieGenreQuery();

  const [loading]=useState(true)

  if (isLoading) {
    return (
      <div className="loader-container">
        <ClipLoader
          color={"#f88c6b"}
          loading={loading}
          size={300}
          aria-label="Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  if (isError) {
    return <Alert variant="warning">{error.message}</Alert>;
  }

  const handleGenreChange = (event) => {
    sortGenre(event.target.value);
  };

  return (
<div className="genre-container">
      <label htmlFor="genre-select" className="genre-label">Genre: </label>
      <select
        id="genre-select"
        className="genre-select"
        name="genre"
        onChange={handleGenreChange}
        value={selectedGenre}
      >
        <option value="">✴All Genres✴</option>
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
