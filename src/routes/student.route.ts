import express from "express";
import { index, ejs } from "../controllers/student.controller";

export const studentRouter = express.Router();

studentRouter.get("/", index);
studentRouter.get("/ejs", ejs);