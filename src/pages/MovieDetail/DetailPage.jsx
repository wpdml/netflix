import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { Alert, Badge, Button } from "react-bootstrap";
import "./DetailPage.style.css";
import Trailer from "../../common/Trailer/Trailer";
import Review from "./contents/Review/Review";
import Recommendation from "./contents/Recommendation/Recommendation";
import { ClipLoader } from "react-spinners";

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
    return <h1>No Movie Details Found</h1>;
  }

  return (
    <div className="detail-container">
      {play && <Trailer movieId={data.id} setPlay={setPlay} play={play} />}
      <div className="movie-about">
        <div className="img-info">
          <div className="img">
            {data?.poster_path ? (
              <img
                src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path}`}
                alt="movie-img"
                className="movie-img"
              />
            ) : (
              <img
                src="https://media.istockphoto.com/id/1369028313/vector/page-or-file-not-found-icon-isolated-vector-illustration.jpg?s=612x612&w=0&k=20&c=k90tNQyUODLlEpJbRLGrg1WEJ1zubLcZMHjnM3B3_Ec="
                alt="no-img-available"
                className="no-img"
              />
            )}
          </div>

          <div className="detail-info-box">
            <h1 className="detail-title">{data.title}</h1>
            <div className="detail-genre">
              {data.genres.map((genre) => (
                <Badge bg="danger" key={genre.id} className="badge">
                  {genre.name}
                </Badge>
              ))}
            </div>
            <div className="detail-info">
              ★{data?.vote_average.toFixed(1)} ({data?.vote_count} reviews) •{" "}
              {hour(data.runtime)} • Released on {data.release_date} •{" "}
              {data?.spoken_languages[0]?.english_name}
            </div>
            <div className="detail-overview">Overview</div>
            <div className="overview">{data.overview}</div>
            <div className="buttons">
              <button className="play-button" onClick={playTrailer}>
                ▷ Trailer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="review-section">
        <h2 className="review-title">✰ User Reviews ✰</h2>
        <Review />
      </div>

      <div className="recommendation-section">
        <h2 className="recommendation-title">✴︎˚｡⋆Recommended Movies⋆⭒˚.</h2>
        <Recommendation />
      </div>
    </div>
  );
};

export default DetailPage;
