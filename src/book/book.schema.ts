import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";

@Schema({ timestamps: true })
export class Book {
  @Prop()
  title: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: "User" })
  author: ObjectId;

  @Prop()
  summ: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
