import React, { useState } from "react";
import "./ReviewCard.style.css";

const ReviewCard = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const isLongContent = review.content.length > 200;
  const displayContent = isExpanded
    ? review.content
    : `${review.content.slice(0, 200)}...`;

  return (
    <div className="reviewCard">
      <div className="reviewCard-info">
        <div className="date-author">
          <h2 className="review-author">{review.author}</h2>
          <h3 className="little-star">⋆</h3>
          <h className="review-date">
            {new Date(review.created_at).toLocaleDateString()}
          </h>
        </div>
      </div>
      <p className="review-content">
        {displayContent}
        {isLongContent && (
          <button onClick={toggleExpand} className="review-button">
            {isExpanded ? "⋆Show Less⋆" : "⋆See All⋆"}
          </button>
        )}
      </p>
    </div>
  );
};

export default ReviewCard;
