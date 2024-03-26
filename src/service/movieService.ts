import { Request, Response, NextFunction } from "express";
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
            // console.log("Request Body:", req.body); // Log request body
    
            // Extract movie data from request body
            const { name, released_on } = req.body;
    
            // Check if the required fields are present in the request body
            if (!name || !released_on) {
                return res.status(400).json({ error: "Missing required fields" });
            }
    
            // Call the create method of the MovieRepository to create a new movie
            const newMovie = await MovieRepository.create({ name, released_on });
    
            // Return the newly created movie in the response
            res.status(201).json(newMovie);
        } catch (error) {
            // Log the error for debugging purposes
            console.error("Error creating movie:", error);
            // Return an internal server error response
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    
    
}

