import { User, userModel } from "../models/userModel"; // Assuming you have a UserModel

export class UserRepository {
  async getById(userId: string) {
    return await userModel.findById(userId);
  }

  async getAll(skip: number, limit: number): Promise<User[]> {
    const users = await userModel.find({}).skip(skip).limit(limit);
    return users.map(user => ({
        name: user.name || "",
        email: user.email || "",
        password: user.password || "",
        isVerified: user.isVerified || false
    }));
  }

  async countAll(): Promise<number> {
    return await userModel.countDocuments({});
  }

  async updateById(userId: string, userData: any) {
    return await userModel.findByIdAndUpdate(userId, userData);
  }

  async deleteById(userId: string) {
    return await userModel.findByIdAndDelete(userId);
  }

  async create(userData: any) {
    return await userModel.create(userData);
  }
}
