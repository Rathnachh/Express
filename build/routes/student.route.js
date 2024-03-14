"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("../controllers/student.controller");
exports.studentRouter = express_1.default.Router();
exports.studentRouter.get("/", student_controller_1.index);
exports.studentRouter.get("./ejs", student_controller_1.ejs);
