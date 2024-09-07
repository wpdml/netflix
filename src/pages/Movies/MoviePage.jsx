import React, { useState, useEffect } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Alert, Col, Container, Row } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import Popularity from "./components/Popularity";
import Genre from "./components/Genre";
import "./MoviePage.style.css";

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

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  if (!filteredMovies || filteredMovies.length === 0) {
    return <h1>No Results Found</h1>;
  }

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          <Genre sortGenre={handleSortByGenre} />
        </Col>
        <Col lg={8} xs={12}>
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
              <Col key={index} lg={4} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data.total_pages}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
