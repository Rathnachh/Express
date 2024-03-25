import { Request, Response, NextFunction } from "express";
import { MovieService } from "../service/movieService";

export const movieController = {
  getById: async function (req: Request, res: Response, next: NextFunction) {
    await MovieService.getById(req, res, next);
  },
  getAll: async function (req: Request, res: Response) {
    await MovieService.getAll(req, res);
  },
  updateById: async function (req: Request, res: Response) {
    await MovieService.updateById(req, res);
  },

deleteById: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const movieId = req.params.movieId;
      // Call the service method to delete the movie
      await MovieService.deleteById(movieId);
      // Respond with success message
      res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
      // Handle errors
      next(error); // Pass the error to the error handling middleware
    }
  },
  
  create: async function (req: Request, res: Response) {
    await MovieService.create(req.body, res); // Pass movie data
  },
};
