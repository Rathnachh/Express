import express from "express";
import { movieController } from "../controllers/movie.controller";
// import { validateMongooseId } from "../middleware/mongoose";
import { validate } from "../middleware/validate";
import movieSchema from "../schema/movieSchema";
import { validationmongoID } from "../middleware/validationMongoId";

export const movieRouter = express.Router();

movieRouter.get("/", movieController.getAll);
movieRouter.post("/", validate(movieSchema), movieController.create);
movieRouter.get("/:movieId", movieController.getById);
movieRouter.put("/:movieId", validationmongoID, movieController.updateById);
movieRouter.delete("/:movieId", movieController.deleteById);
