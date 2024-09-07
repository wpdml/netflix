import React from "react";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constant/responsive";
import { useTopMoviesQuery } from "../../../../hooks/useTopMoives";

const TopMovieSlide = ()=>{
  const {data,isLoading,isError, error}=useTopMoviesQuery()

  console.log("upcoming",data)

  if (isLoading){
    return <h1>Loading...</h1>
  } if (isError){
    return <Alert variant="danger">{error.message}</Alert>
  }
  return (
    <div>
      <MovieSlider
        title="Top-Rated Movies"
        movies={data.results}
        responsive={responsive}
      />
    </div>)
    }

export default TopMovieSlide;