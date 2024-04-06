import { Request, Response } from "express";
import { UserService } from "../service/userService";
import { User } from "../database/models/userModel";
import { generateEmailVerificationToken } from "../utils/randomToken";
import { saveToken } from "../service/tokenService";
import { checkTokenExists } from "../service/tokenService";
// import { generateEmailVerificationToken, saveToken } from "../service/tokenService";
import {
  Route,
  Get,
  Post,
  Request as TsoaRequest,
  Response as TsoaResponse,
  Body,
  Delete,
  Query,
  Queries,
  Tags,
} from "tsoa";
import { sendVerificationEmail } from "../utils/emailSender";

export interface QueryParams {
  limit: number;
  page: number;
}

const userService = new UserService();

@Route("user")
@Tags("User")
export class UserController {
  @Get("/")
  // public async getAll(@Queries() options: QueryParams): Promise<any> {
  //   try {
  //     const users = await userService.getAll(options);

  //     return users;
  //   } catch (err: any) {
  //     throw new Error(err.message);
  //   }
  // }

  // @Get("/:userId")
  // public async getById(userId: string): Promise<any> {
  //   try {
  //     const user = await userService.getById(userId);
  //     if (user) {
  //       return {
  //         status: "success",
  //         message: "User is found",
  //         data: user,
  //       };
  //     } else {
  //       throw new Error("User not found");
  //     }
  //   } catch (error: any) {
  //     throw new Error(error.message || "Failed to get user");
  //   }
  // }
  @Post("/")
  public async create(@Body() requestBody: any): Promise<any> {
    try {
      const { name, email, password, isVerified } = requestBody;
      const newUser = await userService.create({
        name,
        email,
        password,
        isVerified,
      });

      const token = generateEmailVerificationToken(newUser._id);

      await saveToken(newUser._id, token);
      await sendVerificationEmail(newUser, token);
      // return newUser;
      return {
        status: "success",
        message: "User created successfully",
        data: newUser,
      };
      // return { message: "User deleted successfully" };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  @Delete("/:userId")
  public async deleteById(userId: string): Promise<any> {
    try {
      await userService.deleteById(userId);
      return { message: "User deleted successfully" };
    } catch (error: any) {
      throw new Error(error.message || "Failed to delete user");
    }
  }

  public async verifyEmail(req: Request, res: Response): Promise<void> {
    try {
      const token = req.query.token as string; // Extract token from request query
      // Call the appropriate method from your service to handle email verification
      // For example:
      // await userService.verifyEmail(token);
      res.status(200).json({ message: "Email verification successful" });
    } catch (error: any) {
      throw new Error (error.message || "Email verification failed");
    }
  }
}
