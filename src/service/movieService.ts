
import { Request, Response, NextFunction } from "express";
import { statusCodes } from "../utils/const/statusCode";
import { statusMessages } from "../utils/const/statusCode";
import { movieRepository } from "../database/repository/movieRepo";

export const movieService = {
  getById: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const m = await movieRepository.findById(req.params.movieId);
      if (m) {
        res.status(statusCodes.SUCCESS).json({
          status: statusCodes.SUCCESS,
          message: statusMessages[statusCodes.SUCCESS],
          data: m,
        });
      } else {
        _next(new Error("Movie not found!!!"));
      }
    } catch (err) {
      res.status(statusCodes.SERVER_ERROR).json({
        status: statusCodes.SERVER_ERROR,
        message: statusMessages[statusCodes.SERVER_ERROR],
      });
    }
  },
  getAll: async (req: Request, res: Response) => {
    try {
      const movies = await movieRepository.findAll();
      res.status(statusCodes.SUCCESS).json({
        status: statusCodes.SUCCESS,
        message: statusMessages[statusCodes.SUCCESS],
        data: movies,
      });
    } catch (err) {
      res.status(statusCodes.SERVER_ERROR).json({
        status: statusCodes.SERVER_ERROR,
        message: statusMessages[statusCodes.SERVER_ERROR],
      });
    }
  },
  updateById: async (req: Request, res: Response) => {
    try {
      const m = await movieRepository.updateById(req.params.movieId, {
        name: req.body.name,
        released_on: req.body.released_on,
      });
      res.status(statusCodes.SUCCESS).json({
        status: statusCodes.SUCCESS,
        message: statusMessages[statusCodes.SUCCESS],
        data: m,
      });
    } catch (err) {
      res.status(statusCodes.SERVER_ERROR).json({
        status: statusCodes.SERVER_ERROR,
        message: statusMessages[statusCodes.SERVER_ERROR],
      });
    }
  },
  deleteById: async (req: Request, res: Response) => {
    try {
      const movies = await movieRepository.deleteById(req.params.movieId);
      if (!movies) {
        res.status(statusCodes.NOT_FOUND).json({
          status: statusCodes.NOT_FOUND,
          message: statusMessages[statusCodes.NOT_FOUND],
        });
      } else {
        res.status(statusCodes.SUCCESS).json({
          status: statusCodes.SUCCESS,
          message: statusMessages[statusCodes.SUCCESS],
        });
      }
    } catch (err) {
      res.status(statusCodes.SERVER_ERROR).json({
        status: statusCodes.SERVER_ERROR,
        message: statusMessages[statusCodes.SERVER_ERROR],
      });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const movieData = {
        name: req.body.name,
        released_on: req.body.released_on,
      };
      const m = await movieRepository.create(movieData);
      res.json({
        status: statusCodes.SUCCESS,
        message: statusMessages[statusCodes.SUCCESS],
        data: m,
      });
    } catch (err) {
      res.status(statusCodes.SERVER_ERROR).json({
        status: statusCodes.SERVER_ERROR,
        message: statusMessages[statusCodes.SERVER_ERROR],
      });
    }
  },
};
