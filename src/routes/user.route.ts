import express from "express";
import { index } from "../controllers/student.controller";
export const userRouter = express.Router();
userRouter.get("/",index);