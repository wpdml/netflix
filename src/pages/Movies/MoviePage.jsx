import React, { useState, useEffect } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Alert, Col, Container, Row, Button } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import Popularity from "./components/Popularity";
import Genre from "./components/Genre";
import "./MoviePage.style.css";
import { ClipLoader } from "react-spinners";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q") || "";
  const genre = query.get("g") || ""; 
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(""); 
  const [filteredMovies, setFilteredMovies] = useState([]);

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    sortBy,
    genre,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setPage(1);
  }, [sortBy, genre]);

  useEffect(() => {
    if (data?.results) {
      const allMovies = data.results;
      const filtered = genre === "" || genre === "All"
        ? allMovies
        : allMovies.filter((movie) => movie.genre_ids.includes(Number(genre)));

      const sorted = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case "popularity.desc":
            return b.popularity - a.popularity;
          case "popularity.asc":
            return a.popularity - b.popularity;
          case "rating.asc":
            return a.vote_average - b.vote_average;
          case "rating.desc":
            return b.vote_average - a.vote_average;
          default:
            return 0;
        }
      });

      setFilteredMovies(sorted);
    }
  }, [data, genre, sortBy]);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleSortPopularity = (sortOption) => {
    setSortBy(sortOption);
  };

  const handleSortByGenre = (genreId) => {
    query.set("g", genreId);
    setQuery(query);
    setPage(1); 
  };

  const handleBackToPage = () => {
    navigate(-1);
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

  if (!filteredMovies || filteredMovies.length === 0) {
    return (
      <Container>
        <h1 className="no-results">No Results Found...</h1>
        <button onClick={handleBackToPage} className="page-button">
        ↩ Back to Page
        </button>
      </Container>
    );
  }

  return (
    <Container>
      <div>
        <div>
          <Genre sortGenre={handleSortByGenre} />
        </div>
        <div>
          <Popularity
            options={[
              "popularity.desc",
              "popularity.asc",
              "rating.desc",
              "rating.asc",
            ]}
            sortPopularity={handleSortPopularity}
          />
          <Row>
            {filteredMovies.map((movie, index) => (
              <Col key={index} lg={3} md={4} sm={6} xs={12} className="mb-4">
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <ReactPaginate
            nextLabel="▶"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            marginPagesDisplayed={0}
            pageCount={data.total_pages}
            previousLabel="◀"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
        </div>
      </div>
    </Container>
  );
};

export default MoviePage;
