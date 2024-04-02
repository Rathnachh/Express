"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_route_1 = require("./routes/student.route");
const user_route_1 = require("./routes/user.route");
const app = (0, express_1.default)();
const port = 3000;
app.set('view engine', 'ejs');
app.get("/", (req, res) => {
    res.send("Hello World with Express and TypeScript!");
});
// app.get("/student", (req: Request, res: Response) => {
//     res.send("Hello student!");
//   });
app.use('./student', student_route_1.studentRouter);
app.use('./user', user_route_1.userRouter);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
