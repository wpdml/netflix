import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { Badge, Button } from "react-bootstrap";
import "./DetailPage.style.css";
import Trailer from "../../common/Trailer/Trailer";
import Review from "./contents/Review/Review";
import Recommendation from "./contents/Recommendation/Recommendation"; // Import Recommendation

const DetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieDetailQuery({ id });
  const [play, setPlay] = useState(false);
  const navigate = useNavigate();

  const hour = (minutes) => {
    if (minutes === 0) return "0h";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours === 0 ? `${mins}m` : `${hours}h${mins > 0 ? ` ${mins}m` : ""}`;
  };

  const playTrailer = () => {
    setPlay(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data) return <div>No movie details found.</div>;

  return (
    <div className="detail-container">
      {play && <Trailer movieId={data.id} setPlay={setPlay} play={play} />}

      <div className="img">
        {data?.poster_path ? (
          <img
            src={`https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.poster_path}`}
            alt="movie-img"
            className="movie-img"
          />
        ) : (
          <img
            src="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
            alt="no-img-available"
            className="no-img"
          />
        )}
        <div className="gradient-overlay"></div>

        {/* Title and Genre Overlay */}
        <div className="detail-info-box">
          <h1 className="detail-title">{data.title}</h1>
          <div className="detail-genre">
            {data.genres.map((genre) => (
              <Badge bg="danger" key={genre.id} className="badge">
                {genre.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="detail-info">
        ★{data?.vote_average.toFixed(1)} • ({data?.vote_count} reviews) • {hour(data.runtime)} • Released on {data.release_date} • {data?.spoken_languages[0]?.english_name}
      </div>
      <div className="detail-overview">Overview</div>
      <div>{data.overview}</div>
      <div className="buttons">
        <Button variant="outline-danger" onClick={playTrailer}>
          ▷ Trailer
        </Button>
      </div>

      {/* Review Section */}
      <div className="review-section">
        <h2 className="review-title">User Reviews</h2>
        <Review />
      </div>

      {/* Recommendation Section */}
      <div className="recommendation-section">
        <h2 className="recommendation-title">Recommended Movies</h2>
        <Recommendation />
      </div>
    </div>
  );
};

export default DetailPage;
