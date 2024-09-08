import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMoviewReview = ({ id }) => {
  return api.get(`/movie/${id}/reviews`);
};

export const useMovieReviewQuery = (id) => {
  return useQuery({
    queryKey: ["movie-review", { id }],
    queryFn: () => fetchMoviewReview({ id }),
    select: (result) => result.data,
  });
};
