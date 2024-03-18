import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: z.AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync(req.body);
        next();
    } catch (error) {
        next(new Error('Moviename must be at least 3 characters long'));
    }
  };
