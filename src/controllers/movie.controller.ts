// import { Request, Response, NextFunction } from "express";
// import { MovieService } from "../service/movieService";

// export class MovieController {
//   static async getById(req: Request, res: Response, next: NextFunction) {
//     await MovieService.getById(req, res, next);
//   }

//   static async getAll(req: Request, res: Response) {
//     await MovieService.getAll(req, res);
//   }

//   static async updateById(req: Request, res: Response) {
//     await MovieService.updateById(req, res);
//   }

//   static async deleteById(req: Request, res: Response, next: NextFunction) {
//     try {
//       const movieId = req.params.movieId;
//       // Call the service method to delete the movie
//       await MovieService.deleteById(movieId);
//       // Respond with success message
//       res.status(200).json({ message: "Movie deleted successfully" });
//     } catch (error) {
//       // Handle errors
//       next(error); // Pass the error to the error handling middleware
//     }
//   }

//   static async create(req: Request, res: Response) {
//     await MovieService.create(req, res); // Pass movie data
//   }
// }

import { Request, Response } from "express";
import { Movie } from "../database/models/movieModel";
import { MovieService } from "../service/movieService";
import {
  Route,
  Get,
  Post,
  Request as TsoaRequest,
  Response as TsoaResponse,
  Body,
} from "tsoa";

@Route("movie")
export class MovieController {
  @Get("/")
  public async getAll(): Promise<any> {
    try {
      const movieService = new MovieService();
      const movies = await movieService.getAll();
      if (Array.isArray(movies) && movies.length > 0) {
        return {
          status: "success",
          message: "Movies are found",
          data: movies,
        };
      } else {
        throw new Error("No movies found");
      }
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch movies");
    }
  }

  @Get("/:movieId")
  public async getById(movieId: string): Promise<any> {
    try{
      const movieService = new MovieService();
      const movie = await movieService.getById(movieId);
      if (movie) {
        return {
          status: "success",
          message: "Movie is found",
          data: movie,
        };
      } else {
        throw new Error("Movie not found");
      }
    }catch(error:any){
       throw new Error(error.message || "Updated Failed")
    }
  }

  @Post("/")
  public async create(@Body() requestBody: Movie): Promise<void> {
    try {
      const movieService = new MovieService();
      const { name, released_on } = requestBody;
      const newMovie = await movieService.create({ name, released_on });
      return newMovie;
    } catch (error: any) {
      throw error;
    }
  }

  



}
