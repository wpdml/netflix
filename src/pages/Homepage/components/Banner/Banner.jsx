import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import "./Banner.style.css";
import { useMovieById } from "../../../../hooks/useMovie";
import ClipLoader from "react-spinners/ClipLoader";


const Banner = () => {
  const movieId = 9603;
  const { data, isLoading, isError, error } = useMovieById(movieId);
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
  if (!data) {
    return <h1>No data available</h1>;
  }

  return (
    <div>
    <div className="banner-box">
      <div
        style={{
          backgroundImage: `url(https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${data.poster_path})`,
        }}
        className="banner"
      >
        <div className="banner-text-area">
          <div className="banner-text">
          <h1 className="banner-title">{data.title}</h1>
          <h2 className="banner-rating">★{data?.vote_average.toFixed(1)}</h2>
          </div>
          <p className="banner-overview">{data.overview}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Banner;
