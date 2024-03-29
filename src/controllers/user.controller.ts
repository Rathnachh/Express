import { Request, Response } from "express";
import { UserService } from "../service/userService";
import { User } from "../database/models/userModel";
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
} from "tsoa";

interface QueryParams {
  limit?: string;
  page?: string;
}

const userService = new UserService();

@Route("user")
export class UserController {
  @Get("/")
  public async getAll(@Queries() queryParams: QueryParams): Promise<any> {
    try {
      const pageNumber = queryParams ? parseInt(queryParams.page as string) : 1;
      const pageSize = queryParams ? parseInt(queryParams.limit as string) : 10;

      const users = await userService.getAll(pageNumber, pageSize);

      const totalCount = await userService.getAllCount();
      const totalPages = Math.ceil(totalCount / pageSize);

      return {
        status: "success",
        message: "Users are found",
        data: users,
        meta: {
          page: pageNumber,
          limit: pageSize,
          total: totalCount,
          totalPages: totalPages,
        },
      };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  @Get("/:userId")
  public async getById(userId: string): Promise<any> {
    try {
      const user = await userService.getById(userId);
      if (user) {
        return {
          status: "success",
          message: "User is found",
          data: user,
        };
      } else {
        throw new Error("User not found");
      }
    } catch (error: any) {
      throw new Error(error.message || "Failed to get user");
    }
  }

  @Post("/")
  public async create(@Body() requestBody: User): Promise<User> {
    try {
      const { name, email, password, isVerified } = requestBody;
      const newUser = await userService.create({
        name,
        email,
        password,
        isVerified,
      });
      return newUser;
    } catch (error: any) {
      throw error;
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
}
