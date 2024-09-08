import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constant/responsive";
import { useTopMoviesQuery } from "../../../../hooks/useTopMoives";
import "./MovieSlide.style.css"
import { ClipLoader } from "react-spinners";

const TopMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopMoviesQuery();

  console.log("upcoming", data);

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
  return (
    <div className="top-container">
      <div className="top">⭒ Top-Rated Movies ⭒</div>
      <MovieSlider movies={data.results} responsive={responsive} />
    </div>
  );
};

export default TopMovieSlide;
