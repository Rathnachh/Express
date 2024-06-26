import mongoose from "mongoose";
import { boolean, string } from "zod";
export interface User {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
}
const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password:{
    type: String,
  },
  isVerified:{
    type: Boolean, 
  }
});
export const userModel = mongoose.model("User", UserSchema);
