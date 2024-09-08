import React from "react";
import "./MovieCard.style.css";
import { useNavigate } from "react-router-dom";
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

  const goToDetailPage = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${
          movie.poster_path
            ? `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`
            : `https://media.istockphoto.com/id/1369028313/vector/page-or-file-not-found-icon-isolated-vector-illustration.jpg?s=612x612&w=0&k=20&c=k90tNQyUODLlEpJbRLGrg1WEJ1zubLcZMHjnM3B3_Ec=`
        })`,
        backgroundPosition: "center",
      }}
      className="movie-card"
      onClick={goToDetailPage}
    >
      <div className="overlay">
        <h1 className="move-title">{movie.title}</h1>
        <div className="genre-list">
          {showGenre(movie.genre_ids).map((id) => (
            <badge className="badge">{id}</badge>
          ))}
        </div>
        <div>
          <div>★{movie.vote_average.toFixed(1)}</div>
          <div>{movie.adult ? "🔞" : "Under 18"}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
