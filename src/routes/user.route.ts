// import express from "express";
import express, { Request, Response, NextFunction, query } from "express";
// import { validateMongooseId } from "../middleware/mongoose";
import { UserController } from "../controllers/user.controller";
// import { validate } from "../middleware/validate";
import { validateEmail } from "../middleware/validateEmail";
import userSchema from "../schema/userSchema";
import { validationmongoID } from "../middleware/validationMongoId";

export const userRouter = express.Router();
const userController = new UserController();

userRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const movie = await userController.getAll(req.query);
      res.status(200).json(movie);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

userRouter.post(
  "/",
  validateEmail(userSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email,password,isVerified } = req.body;
      const createdUser = await userController.create({ name, email,password,isVerified });
      res.status(201).json({ createdUser });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
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
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

userRouter.delete("/:userId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    const result = await userController.deleteById(userId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
