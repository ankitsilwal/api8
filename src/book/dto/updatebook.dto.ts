import mongoose from "mongoose";

export class UpdateBookDto{
    title:string;
    author:mongoose.Types.ObjectId;
    summ:string;
}