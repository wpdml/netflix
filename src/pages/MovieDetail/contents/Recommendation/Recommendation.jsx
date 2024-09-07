import React from 'react';
import './Recommendation.style.css';
import { useMovieRecommendationQuery } from '../../../../hooks/useMovieRecommendation';
import { useParams } from 'react-router-dom';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import Alert from 'react-bootstrap/Alert';
import { responsive } from '../../../../constant/responsive';

const Recommendation = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieRecommendationQuery({ id });

  if (isLoading) {
    return <div>Loading recommendations...</div>;
  }

  if (isError) {
    return <Alert variant='danger'>{error?.message || 'An error occurred'}</Alert>;
  }

  if (!data || !data.results || data.results.length === 0) {
    return <div>No recommendations available.</div>;
  }

  return (
    <div>
      <MovieSlider movies={data.results} responsive={responsive} />
    </div>
  );
};

export default Recommendation;
