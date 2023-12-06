import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { User } from "src/auth/user.schema";
import { UpdateUserDto } from "./dto/updateuser.dto";
import * as bcrypt from "bcrypt";
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getall(): Promise<User[]> {
    const getallusers = await this.userModel.find({}, { password: 0 });
    return getallusers;
  }

  async getbyid(userid: mongoose.Types.ObjectId): Promise<User> {
    const getuserbyid = await this.userModel.findById(userid, { password: 0 });
    return getuserbyid;
  }

  async updatebyid(userid: mongoose.Types.ObjectId, updatdto: UpdateUserDto) {
    const { username, password, role, pnumber } = updatdto;
    const hashedpassword = await bcrypt.hash(password,10);
    const updateuser = await this.userModel.findByIdAndUpdate(
      userid,
      { ...updatdto, password: hashedpassword },
      { new: true }
    );
    if (!updateuser) {
      throw new BadRequestException(`Invalid Details or UserID`);
    }
    return updateuser;
  }

  async deletebyid(userId: mongoose.Types.ObjectId) {
    const deleteuser = await this.userModel.findByIdAndDelete(userId);
    if (!deleteuser) {
      throw new BadRequestException(`User not found with ${userId}`);
    }
    return deleteuser;
  }

  async deleteall(){
    const deleteallusers=await this.userModel.deleteMany();
    return deleteallusers;
  }
}
