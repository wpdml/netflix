import React, { useState } from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import "react-multi-carousel/lib/styles.css";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constant/responsive";
import "./MovieSlide.style.css"
import { ClipLoader } from "react-spinners";

const MovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  console.log("popular Data:", data);


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
    <div className="movie-slide">
      <div className="popular">✴︎ Popular Movies ✴︎</div>
      <MovieSlider
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default MovieSlide;
