import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}

@Schema({ timestamps: true })
export class User {
  id: mongoose.Types.ObjectId;

  @Prop({ unique: true })
  username: string;
  @Prop()
  password: string;
  @Prop()
  role: string;
  @Prop()
  pnumber: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
