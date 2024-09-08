import React, { useState } from 'react'
import { useMovieReviewQuery } from '../../../../hooks/useMovieReview'
import { useParams } from 'react-router-dom';
import ReviewCard from '../../../../common/ReviewCard/ReviewCard';
import { Alert, Button } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';

const Review = () => {

    const [showAll, setShowAll] = useState(false);
    const {id} = useParams();
    const {data, isLoading, isError, error} = useMovieReviewQuery(id);
    console.log ('reviewData>>>', data);

    const reviewsToShow = showAll ? data?.results : data?.results?.slice(0, 3) || [];

    const handleToggle = () => {
        setShowAll(!showAll);
    };

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
      {data?.results?.length > 0 ? (
        <div className='ReviewCardContainer'>
          {reviewsToShow?.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
          <button onClick={handleToggle} className='container-button'>
            {showAll ? '⋆Show Less⋆' : '⋆See All Reviews⋆'}
          </button>
        </div>
      ) : (
        <div>No Reviews</div>
      )}
  </div>
  )
}

export default Review