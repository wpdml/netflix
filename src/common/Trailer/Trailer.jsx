import React from "react";
import YouTube from "react-youtube";
import { useMovieTrailerQuery } from "../../hooks/useMovieTrailer";
import './Trailer.style.css'; // Import the CSS file

const Trailer = ({ movieId, setPlay }) => {
  const { data, isLoading, isError, error } = useMovieTrailerQuery({ id: movieId });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div className="text-xl text-red-600">{error.message}</div>;
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
      <div className="trailer-container">
        {officials.length > 0 ? (
          <YouTube
            videoId={officials[0]?.key}
            opts={opts}
          />
        ) : (
          <div className="text-center">No Trailer</div>
        )}
        <button className="close-button" onClick={() => setPlay(false)}>×</button>
      </div>
    </div>
  );
};

export default Trailer;
