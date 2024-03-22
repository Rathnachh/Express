import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { MovieRepository } from '../../database/repository/movieRepo';
import { MovieService } from "../../service/movieService";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    try {
        // Create an instance of the MongoDB memory server
        mongoServer = await MongoMemoryServer.create();

        // Get the URI of the MongoDB memory server
        const mongoUri = mongoServer.getUri();

        // Connect Mongoose to the MongoDB memory server
        await mongoose.connect(mongoUri);
    } catch (error) {
        // Log any errors that occur during connection
        console.error("Error connecting to MongoDB:", error);
    }
});


afterAll(async () => {
    try {
        await mongoose.disconnect();
        await mongoServer.stop();
    } catch (error) {
        console.error("Error stopping MongoDB server:", error);
    }
});

describe('Movie Integration test', () => {
    let movieRepository: MovieRepository;

    beforeEach(async () => {
        movieRepository = new MovieRepository();
    });

    test("should add a new movie to the database", async () => {
        // Define the movie data to be added
        const movieData = {
            name: "Test Movie",
            released_on: new Date("2024-03-21"),
        };

        // Add the movie to the database
        const newMovie = await MovieRepository.create(movieData);

        // Assert that the added movie exists and has the correct data
        expect(newMovie).toBeDefined();
        expect(newMovie.name).toBe(movieData.name);
        expect(newMovie.released_on.toISOString()).toBe(movieData.released_on.toISOString());
    });

    //show error when movie create fail
    test("should throw an error when movie creation fails", async () => {
        // Define the movie data to be added
        const movieData = {
            name: "Test Movie",
            released_on: new Date("2024-03-21"),
        };
    
        // Mock the behavior of the create method to throw an error
        jest.spyOn(MovieRepository, 'create').mockRejectedValueOnce(new Error("Movie creation failed"));
    
        // Assert that calling create method throws an error when movie creation fails
        await expect(MovieRepository.create(movieData)).rejects.toThrow(Error);
    });

    test("should delete a movie from the database", async () => {
        // Define the movie data to be added
        const movieData = {
            name: "Test Movie",
            released_on: new Date("2024-03-21"),
        };
    
        // Add the movie to the database
        const newMovie = await MovieRepository.create(movieData);
    
        // Ensure newMovie is defined before accessing its _id property
        expect(newMovie).toBeDefined();
    
        // Convert ObjectId to string
        const movieIdString = newMovie._id.toString();
    
        // Delete the movie from the database
        const deletedMovie = await MovieRepository.deleteById(movieIdString);
    
        // Assert that the deleted movie exists and has the correct data
        expect(deletedMovie).not.toBeNull(); // Ensure deletedMovie is not null
        if (deletedMovie) {
            expect(deletedMovie.name).toBe(movieData.name);
            expect(deletedMovie.released_on.toISOString()).toBe(movieData.released_on.toISOString());
        }
    });
    
    
});

 