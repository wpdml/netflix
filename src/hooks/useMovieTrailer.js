import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieTrailer = async ({ id }) => {
  try {
    const response = await api.get(`/movie/${id}/videos`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch trailer: " + error.message);
  }
};

export const useMovieTrailerQuery = (id) => {
  return useQuery({
    queryKey: ["movie-trailer", id],
    queryFn: () => fetchMovieTrailer(id),
  });
};
