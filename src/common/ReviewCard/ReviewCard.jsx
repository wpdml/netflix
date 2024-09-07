import React, { useState } from 'react'
import "./ReviewCard.style.css"
import { Button } from 'react-bootstrap';

const ReviewCard = ({review}) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const isLongContent = review.content.length > 200;
  const displayContent = isExpanded ? review.content : `${review.content.slice(0, 200)}...`;

  return (
    <div className='reviewCard'>
      <div className='reviewCard-info'>
        <h2>{review.author}</h2>
        <h3>{new Date(review.created_at).toLocaleDateString()}</h3>
      </div>
      <p className='reviewCard-content'>{displayContent}{isLongContent && (
        <Button variant="outline-danger" onClick={toggleExpand} className="reviewCard-toggle-btn">
          {isExpanded ? 'Show Less' : 'See All'}
        </Button>)}
      </p>
    </div>
  )
}

export default ReviewCard