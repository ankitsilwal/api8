import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
} from "@nestjs/common";
import { User } from "src/auth/user.schema";
import { UserService } from "./user.service";
import mongoose from "mongoose";
import { UpdateUserDto } from "./dto/updateuser.dto";

@Controller("user")
export class UserController {
  constructor(private userservice: UserService) {}
  @Get()
  async getall(): Promise<User[]> {
    const getallusers = await this.userservice.getall();
    return getallusers;
  }

  @Get(":id")
  async getbyid(@Param("id") userId: mongoose.Types.ObjectId) {
    const getuserbyid = await this.userservice.getbyid(userId);
    return getuserbyid;
  }

  @Put(":id")
  async updatebyid(
    @Param("id") userId: mongoose.Types.ObjectId,
    @Body() updatedto: UpdateUserDto
  ) {
    try {
      return await this.userservice.updatebyid(userId, updatedto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(":id")
  async deletebyid(@Param("id") userId: mongoose.Types.ObjectId) {
    try {
      const userdelete = await this.userservice.deletebyid(userId);
      return { message: "User Deleted" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete()
  async deleteall() {
    return await this.userservice.deleteall();
  }
}
