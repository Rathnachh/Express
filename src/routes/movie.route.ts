import express from "express";
import { movieController } from "../controllers/movie.controller";
import { validateMongooseId } from "../middleware/mongoose";
import { validate } from "../middleware/validate";
import movieSchema from "../schema/movieSchema";

export const movieRouter = express.Router();

movieRouter.get("/", movieController.getAll);
movieRouter.post("/", validate(movieSchema), movieController.create);
movieRouter.get("/:movieId", movieController.getById);
movieRouter.put("/:movieId", validateMongooseId, movieController.updateById);
movieRouter.delete("/:movieId", validateMongooseId, movieController.deleteById);
