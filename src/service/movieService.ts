import { Request, Response, NextFunction } from "express";
import { statusCodes } from "../utils/const/statusCode";
import { statusMessages } from "../utils/const/statusCode";
import { MovieRepository } from "../database/repository/movieRepo";
import { movieModel } from "../database/models/movieModel";


export class MovieService {
    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const movieId = req.params.movieId;
            const movie = await MovieRepository.findById(movieId);
            if (!movie) {
                return res.status(404).json({ error: "Movie not found" });
            }
            res.json(movie);
        } catch (error) {
            console.error("Error fetching movie by ID:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    static async getAll(req: Request, res: Response) {
        try {
            const movies = await MovieRepository.findAll();
            res.json(movies);
        } catch (error) {
            console.error("Error fetching all movies:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async updateById(req: Request, res: Response) {
        try {
            const movieId = req.params.movieId;
            const updatedMovie = await MovieRepository.updateById(movieId, req.body);
            res.json(updatedMovie);
        } catch (error) {
            console.error("Error updating movie by ID:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async deleteById(movieId :string) {
        try {
           
            const deletedMovie = await MovieRepository.deleteById(movieId);
            if (!deletedMovie) {
               throw new Error("Movie not found" );
            }
           return {message : 'success'};
        } catch (error : any) {
            // Handle the error
            // throw new Error(error.message);
            throw error;
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const movieData = req.body;
            const newMovie = await MovieRepository.create(movieData);
            res.json(newMovie);
        } catch (error) {
            console.error("Error creating movie:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

