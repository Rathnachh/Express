import { Request, Response } from "express";
import { UserService } from "../service/userService";
import { generateEmailVerificationToken } from "../utils/randomToken";
import { saveToken } from "../service/tokenService";
import { sendVerificationEmail } from "../utils/emailSender";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const newUser = await this.userService.create({
        name,
        email,
        password,
        isVerified: false, // Ensure that isVerified is initially set to false
      });

      const token = generateEmailVerificationToken(newUser._id);
      await saveToken(newUser._id, token);
      await sendVerificationEmail(newUser, token);

      res.status(201).json({
        status: "success",
        message: "User created successfully",
        data: newUser,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async deleteById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      await this.userService.deleteById(userId);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async verifyEmail(req: Request, res: Response): Promise<void> {
    try {
      const token = req.query.token as string; // Extract token from request query
      await this.userService.verifyEmail(token);
      res.status(200).json({ message: "Email verification successful" });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Email verification failed" });
    }
  }
}
