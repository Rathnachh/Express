// import express from "express";
import express, { Request, Response, NextFunction, query } from "express";
// import { validateMongooseId } from "../middleware/mongoose";
import { UserController } from "../controllers/user.controller";
// import { validate } from "../middleware/validate";
import { validateEmail } from "../middleware/validateEmail";
import userSchema from "../schema/userSchema";
import { validationmongoID } from "../middleware/validationMongoId";

interface QueryParams {
  limit: number;
  page: number;
}

export const userRouter = express.Router();
const userController = new UserController();

userRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit, page } = req.query;

    const options: QueryParams = {
      limit: parseInt(limit as string),
      page: parseInt(page as string),
    };

    const users = await userController.getAll(options);
    res.status(200).json({
      message: "GET success",
      users: users.usersData,
      paginate: users.pagination,
    });
  } catch (error: unknown) {
    next(error);
  }
});

userRouter.post(
  "/",
  validateEmail(userSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, isVerified } = req.body;
      const createdUser = await userController.create({
        name,
        email,
        password,
        isVerified,
      });
      res.status(201).json({ createdUser });
    } catch (error: unknown) {
      next(error);
    }
  }
);

userRouter.get(
  "/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const user = await userController.getById(userId);
      res.status(200).json(user);
    } catch (error: unknown) {
      next(error);
    }
  }
);

userRouter.delete(
  "/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const result = await userController.deleteById(userId);
      res.status(200).json(result);
    } catch (error: unknown) {
      next(error);
    }
  }
);
