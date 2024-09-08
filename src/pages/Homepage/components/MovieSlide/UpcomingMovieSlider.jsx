import React, { useState } from "react";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovies";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constant/responsive";
import "./MovieSlide.style.css"
import { ClipLoader } from "react-spinners";

const UpcomingMovieSlide = ()=>{
  const {data,isLoading,isError, error}=useUpcomingMoviesQuery()

  console.log("upcoming",data)

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
    <div>
      <div className="upcoming">⟡ Upcoming Movies ⟡</div>

      <MovieSlider
        movies={data.results}
        responsive={responsive}
      />
    </div>)
    }

export default UpcomingMovieSlide;