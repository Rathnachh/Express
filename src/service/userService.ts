import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../database/repository/userRepo"; 
import { User, userModel } from "../database/models/userModel"; 
import bcrypt from 'bcrypt';

export class UserService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  async getAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return await userModel.find({}).skip(skip).limit(limit);
  }

  async getAllCount() {
    return await userModel.countDocuments({});
  }

  async getById(userId: string): Promise<User | null> {
    try {
      const user = await this.userRepo.getById(userId);
      return user ? user.toObject() : null;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  }

  async create(user: User): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10); 
      const newUser = await this.userRepo.create({ ...user, password: hashedPassword });
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
}
