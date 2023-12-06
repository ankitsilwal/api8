import mongoose from "mongoose";

export class UserDto{
    id: mongoose.Types.ObjectId;
    username:string;
    password:string;
    role:string;
    pnumber:string;
}