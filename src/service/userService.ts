import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../database/repository/userRepo";
import { User, userModel } from "../database/models/userModel";
import bcrypt from "bcrypt";
import { QueryParams } from "src/controllers/user.controller";

import { generateEmailVerificationToken } from "../utils/randomToken";
import { saveToken } from "../service/tokenService";
import { sendVerificationEmail } from "../utils/emailSender";

export class UserService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  async getAll(options: QueryParams) {
    return await this.userRepo.getAll(options);
  }

  async getAllCount() {
    return await userModel.countDocuments({});
  }

  // async getById(userId: string): Promise<User | null> {
  //   try {
  //     const user = await this.userRepo.getById(userId);
  //     return user ? user.toObject() : null;
  //   } catch (error) {
  //     console.error("Error fetching user by ID:", error);
  //     throw error;
  //   }
  // }

  async create(user: User): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = await this.userRepo.create({
        ...user,
        password: hashedPassword,
      });
      // Generate verification token
      // Send verification email
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async deleteById(userId: string): Promise<any> {
    try {
      return await this.userRepo.deleteById(userId);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
  async updateVerificationStatus(token: string) {
    try {
      const user = await this.userRepo.getUserByToken({ token });
      // Update user's isVerified status to true
      if (!user) {
        throw new Error("User not found");
      }
      const findUser = await this.userRepo.getById({ userId: user.id });
      user.isVerified = true;
      return await user.save(); // Ensure to await the save operation
    } catch (error: any) {
      console.error("Error updating verification status:", error);
      throw error;
    }
  }
}
