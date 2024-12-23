import mongoose from "mongoose";
import { User } from "../intefaces";

const userSchema = new mongoose.Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
},  {
    timestamps: true, 
  });

export const UserModel = mongoose.model<User>("User", userSchema);
