import React from "react";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovies";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constant/responsive";

const UpcomingMovieSlide = ()=>{
  const {data,isLoading,isError, error}=useUpcomingMoviesQuery()

  console.log("upcoming",data)

  if (isLoading){
    return <h1>Loading...</h1>
  } if (isError){
    return <Alert variant="danger">{error.message}</Alert>
  }
  return (
    <div>
      <MovieSlider
        title="Popular Movies"
        movies={data.results}
        responsive={responsive}
      />
    </div>)
    }

export default UpcomingMovieSlide;