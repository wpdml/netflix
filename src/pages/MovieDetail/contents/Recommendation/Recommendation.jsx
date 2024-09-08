import React, { useState } from 'react';
import './Recommendation.style.css';
import { useMovieRecommendationQuery } from '../../../../hooks/useMovieRecommendation';
import { useParams } from 'react-router-dom';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import Alert from 'react-bootstrap/Alert';
import { responsive } from '../../../../constant/responsive';
import { ClipLoader } from 'react-spinners';

const Recommendation = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieRecommendationQuery({ id });

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

  if (!data || !data.results || data.results.length === 0) {
    return <div>No recommendations available</div>;
  }

  return (
    <div>
      <MovieSlider movies={data.results} responsive={responsive} />
    </div>
  );
};

export default Recommendation;
