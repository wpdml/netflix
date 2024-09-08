import React, { useState } from "react";
import YouTube from "react-youtube";
import { useMovieTrailerQuery } from "../../hooks/useMovieTrailer";
import "./Trailer.style.css"; // Import the CSS file
import { Alert } from "react-bootstrap";
import { ClipLoader } from "react-spinners";

const Trailer = ({ movieId, setPlay }) => {
  const { data, isLoading, isError, error } = useMovieTrailerQuery({
    id: movieId,
  });

  const [loading] = useState(true);

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

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const officials = data.results?.filter((video) =>
    video.name.startsWith("Official")
  );

  return (
    <div className="trailer-overlay" onClick={() => setPlay(false)}>
      <div
        className={`trailer-container ${
          officials.length === 0 ? "no-trailer" : ""
        }`}
      >
        {officials.length > 0 ? (
          <YouTube videoId={officials[0]?.key} opts={opts} />
        ) : (
          <div className="text-center">No Trailer Available</div>
        )}
        <button className="close-button" onClick={() => setPlay(false)}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Trailer;
