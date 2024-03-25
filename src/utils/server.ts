import express, { Express, NextFunction, Request, Response } from "express";
import { studentRouter } from "../routes/student.route";
import { movieRouter } from "../routes/movie.route";
import path from "path";
import { swaggerDocument } from "../swagger";
import swaggerUi from "swagger-ui-express";

function createServer(): Express {
  const app = express();
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "/views"));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Hello Express and TypeScript");
  });

  app.use("/student", studentRouter);
  app.use("/movie", movieRouter);
  //   app.use(express.json());
  // app.use("/movies", movieRoutes);

  app.all(
    "*",
    (err: Error, req: Request, res: Response, _next: NextFunction) => {
      res.status(500).json({
        message: err.message,
      });
    }
  );
  return app;
}

export default createServer();
