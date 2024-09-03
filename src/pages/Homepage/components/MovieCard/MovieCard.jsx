import React from "react";
import { Badge } from "react-bootstrap";
import './MovieCard.style.css'

const MovieCard = ({ movie }) => {
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://image.tmdb.org/t/p/original${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h1>{movie.title}</h1>
        {movie.genre_ids.map((id) => (
          <Badge bg="danger">{id}</Badge>
        ))}
        <div>
            <div>★{movie.vote_average.toFixed(1)}</div>
            <div>{movie.adult?'🔞':' '}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
