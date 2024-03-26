import express, { Express, NextFunction, Request, Response } from "express";
import path from "path";
import { swaggerDocument } from "./swagger";
import swaggerUi from "swagger-ui-express";
import { movieRouter } from "./routes/movie.route";

const app: Express = express();

// Parse JSON bodies
app.use(express.json());

// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Home route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Express and TypeScript");
});



// Movie routes
app.use("/movie", movieRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({
    message: err.message,
  });
});

export default app;
