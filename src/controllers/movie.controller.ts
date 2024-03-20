// import { movieModel } from "../models/movie";
// import { Request, Response, NextFunction } from "express";
// import v1 from "uuid";
// import { statusCodes } from "../utils/const/statusCode";
// import { statusMessages } from "../utils/const/statusCode";
// import { movieService } from "../service/movieService";

// export const movieController = {
//   getById: async function (req: Request, res: Response, _next: NextFunction) {
//     try {
//       // const m = await movieModel.findById(req.params.movieId);
//       const m = await movieService.findById(req.params.movieId);
//       if (m) {
//         res.status(statusCodes.SUCCESS).json({
//           status: statusCodes.SUCCESS,
//           message: statusMessages[statusCodes.SUCCESS],
//           data: m,
//         });
//       } else {
//         _next(new Error("Movie not found!!!")); //show when it has right format but wrong id
//       }
//     } catch (err) {
//       res.status(statusCodes.SERVER_ERROR).json({
//         status: statusCodes.SERVER_ERROR,
//         message: statusMessages[statusCodes.SERVER_ERROR],
//       }); //show when id លើស​រឺខ្វះ

//       // _next(new Error("Movie not found!!!"));
//     }
//   },
//   getAll: async function (req: Request, res: Response) {
//     try {
//       // const movies = await movieModel.find({});
//       res.status(statusCodes.SUCCESS).json({
//         status: statusCodes.SUCCESS,
//         message: statusMessages[statusCodes.SUCCESS],
//         data: movies,
//       });
//     } catch (err) {
//       res.status(statusCodes.SERVER_ERROR).json({
//         status: statusCodes.SERVER_ERROR,
//         message: statusMessages[statusCodes.SERVER_ERROR],
//       });
//     }
//   },

//   updateById: async function (req: Request, res: Response) {
//     try {
//       const m = await movieModel.findByIdAndUpdate(req.params.movieId, {
//         name: req.body.name,
//         released_on: req.body.released_on,
//       });
//       res.status(statusCodes.SUCCESS).json({
//         status: statusCodes.SUCCESS,
//         message: statusMessages[statusCodes.SUCCESS],
//         data: m,
//       });
//     } catch (err) {
//       res.status(statusCodes.SERVER_ERROR).json({
//         status: statusCodes.SERVER_ERROR,
//         message: statusMessages[statusCodes.SERVER_ERROR],
//       });
//     }
//   },
//   // deleteById: async function (req:Request, res:Response) {
//   //   await movieModel.deleteOne({ _id: req.params.movieId });
//   //   res.json({
//   //     status: "success",
//   //     message: "Movie deleted successfully!!!",
//   //     data: null,
//   //   });
//   // },
//   deleteById: async function (req: Request, res: Response) {
//     try {
//       const movies = await movieModel.deleteOne({ _id: req.params.movieId });
//       // const movies = await movieModel.findByIdAndDelete(movieModel);
//       if (!movies) {
//         res.status(statusCodes.NOT_FOUND).json({
//           status: statusCodes.NOT_FOUND,
//           message: statusMessages[statusCodes.NOT_FOUND],
//         });
//       } else {
//         res
//           .status(statusCodes.SUCCESS)
//           .json({
//             status: statusCodes.SUCCESS,
//             message: statusMessages[statusCodes.SUCCESS],
          
//           })
//           .end();
//       }
//     } catch (err) {
//       res.status(statusCodes.SERVER_ERROR).json({
//         status: statusCodes.SERVER_ERROR,
//         message: statusMessages[statusCodes.SERVER_ERROR],
//       });
//     }
//   },

//   create: async function (req: Request, res: Response) {
//     console.log("hello", req.body);
//     try {
//       const Id = v1;
//       const m = await new movieModel({
//         movieId: Id,
//         name: req.body.name,
//         released_on: req.body.released_on,
//       }).save();
//       res.json({
//         status: statusCodes.SUCCESS,
//         message: statusMessages[statusCodes.SUCCESS],
//         data: m,
//       });
//     } catch (err) {
//       res.status(statusCodes.SERVER_ERROR).json({
//         status: statusCodes.SERVER_ERROR,
//         message: statusMessages[statusCodes.SERVER_ERROR],
//       });
//     }
//   },
// };

// movie.controller.ts

import { Request, Response, NextFunction } from "express";
import { movieService } from "../service/movieService";

export const movieController = {
  getById: async function (req: Request, res: Response, next: NextFunction) {
    await movieService.getById(req, res, next);
  },
  getAll: async function (req: Request, res: Response) {
    await movieService.getAll(req, res);
  },
  updateById: async function (req: Request, res: Response) {
    await movieService.updateById(req, res);
  },
  deleteById: async function (req: Request, res: Response) {
    await movieService.deleteById(req, res);
  },
  create: async function (req: Request, res: Response) {
    await movieService.create(req, res);
  },
};
