import express, { Application, Request, Response, NextFunction  } from "express";
import { studentRouter } from "./routes/student.route";
import connectToDatabase from "./utils/dbConnection";
import { userRouter } from "./routes/user.route";
import { movieRouter } from "./routes/movie.route";
import "express-async-errors";
// import bodyParser from "body-parser";
import path from "path";

// const app: Application = express();
const app: Application = ((): Application => express())();
const port = 3000;

app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.set("views", path.join(__dirname, "/views"));

//global middleware
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Express and TypeScript");
});

// app.get("/student", (req: Request, res: Response) => {
//   res.send("Hello from student");
// });



app.use("/student", studentRouter);
app.use("/user", userRouter);
app.use("/movie", movieRouter);

// app.listen(port, (): void => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// Global error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong.");
});

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

// create global middleware that include the time that client request
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Request received at ${new Date()}`);
  next();
};

app.use(requestLogger);

// module.exports = app;
export default app
