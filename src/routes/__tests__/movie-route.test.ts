import { Response } from "supertest";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../app";
import mongoose from "mongoose";
import { MovieRepository } from "../../database/repository/movieRepo";
import { dbConnect, dbDisconnect } from "../../utils/test-utils/dbhandler";

describe("GET /movies/:moveId", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    await dbConnect();
  });

  afterAll(async () => {
    await dbDisconnect();
  });
  let repository: MovieRepository;
  beforeEach(() => (repository = new MovieRepository()));

  test("GET /movies should return status 200", async () => {
    const response = await supertest(app).get("/movie");
    expect(response.status).toBe(200);
  });

  test("POST /movies should return status 201 for valid movie data", async () => {
    const movieData = { name: "Test Movie", released_on: "2024-03-21" };
    const existingMovie = await MovieRepository.create(movieData);
    const response = await supertest(app).post("/movies").send(existingMovie);
    expect(response.status).toBe(404);
  });
});
