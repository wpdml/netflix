import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieById = async (id) => {
  const response = await api.get(`/movie/${id}`);
  if (!response.data) {
    throw new Error("No data found");
  }
  return response.data;
};

export const useMovieById = (id) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieById(id),
    enabled: !!id,
    staleTime: 60000,
    cacheTime: 300000,
  });
};
