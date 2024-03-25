import express, { Application, Request, Response, NextFunction } from "express";
import connectToDatabase from "./utils/dbConnection";
import createServer from "./utils/server";
// import bodyParser from "body-parser";

// const app: Application = express();
const app = createServer;
const port = 4000; // Changed the port number to 4000

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

// create global middleware that include the time that client request
// const requestLogger = (req: Request, res: Response, next: NextFunction) => {
//   console.log(`Request received at ${new Date()}`);
//   next();
// };

// app.use(requestLogger);

// module.exports = app;
export default app;
