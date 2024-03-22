
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
  deleteById: async function (req: Request, res: Response) {
    await MovieService.deleteById(req, res);
  },
  create: async function (req: Request, res: Response) {
    await MovieService.create(req, res);
  },
};
