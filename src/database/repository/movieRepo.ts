import { movieModel } from "../models/movieModel";

export const movieRepository = {
    findById: async (movieId: string) => {
      return await movieModel.findById(movieId);
    },
    findAll: async () => {
      return await movieModel.find({});
    },
    updateById: async (movieId: string, movieData: any) => {
      return await movieModel.findByIdAndUpdate(movieId, movieData);
    },
    deleteById: async (movieId: string) => {
      return await movieModel.deleteOne({ _id: movieId });
    },
    create: async (movieData: any) => {
      return await new movieModel(movieData).save();
    },
  };