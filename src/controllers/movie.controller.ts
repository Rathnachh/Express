import { movieModel } from "../models/movie";
import { Request, Response } from "express";
import v1 from "uuid";

export const movieController = {
  getById: async function (req:Request, res:Response) {
    console.log(req.body);
    const m = await movieModel.findById(req.params.movieId);
    res.json({ status: "success", message: "Movie found!!!", data: m });
  },
  getAll: async function (req:Request, res:Response) {
    const movies = await movieModel.find({});

    res.json({
      status: "success",
      message: "Movies list found!!!",
      data: movies,
    });
  },

  updateById: async function (req:Request, res:Response) {
    const m = await movieModel.findByIdAndUpdate(req.params.movieId, {
      name: req.body.name,
    });
    res.json({
      status: "success",
      message: "Movie updated successfully!!!",
      data: m,
    });
  },
  // deleteById: async function (req:Request, res:Response) {
  //   await movieModel.deleteOne({ _id: req.params.movieId });
  //   res.json({
  //     status: "success",
  //     message: "Movie deleted successfully!!!",
  //     data: null,
  //   });
  // },
  deleteById: async function (req: Request, res: Response) {
    try {
      await movieModel.deleteOne({ _id: req.params.movieId });
    res.json({
      status: "success",
      message: "Movie deleted successfully!!!",
      data: null,
    });
    } catch (err) {
        res.status(500).json({
          message: "something went wrong",
        });
   }
  },

  create: async function (req: Request, res: Response) {
    console.log("hello", req.body);
    try {
      const Id = v1;
      const m = await new movieModel({
        movieId: Id,
        name: req.body.name,
        released_on: req.body.released_on,
      }).save();
      res.json({
        status: "success",
        message: "Movie added successfully!!!",
        data: m,
      });
    } catch (err) {
      res.status(500).json({
        message: "something went wrong",
      });
    }
  },
};
