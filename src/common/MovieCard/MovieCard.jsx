import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { Link, useNavigate } from "react-router-dom";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  const navigate = useNavigate();
  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };

  const goToDetailPage =()=> {
    navigate(`/movies/${movie.id}`);
}

  return (
      <div
        style={{
          backgroundImage:
            "url(" +
            `https://image.tmdb.org/t/p/original${movie.poster_path}` +
            ")",
        }}className="movie-card" onClick={goToDetailPage}
      >
        <div className="overlay">
          <h1>{movie.title}</h1>
          {showGenre(movie.genre_ids).map((id) => (
            <Badge bg="danger">{id}</Badge>
          ))}
          <div>
            <div>★{movie.vote_average.toFixed(1)}</div>
            <div>{movie.adult ? "🔞" : "Under 18"}</div>
          </div>
        </div>
      </div>
  );
};

export default MovieCard;
