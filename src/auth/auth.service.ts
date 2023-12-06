import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { Model } from "mongoose";
import { UserDto } from "./dto/user.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async createuser(userdto: UserDto) {
    const { username, password, role, pnumber } = userdto;
    const hashedpassword = await bcrypt.hash(password, 10);
    const usercreation = await this.userModel.create({
      ...userdto,
      password: hashedpassword,
    });
    return usercreation;
  }

  async findbyusername(username: string) {
    const findusername = await this.userModel.findOne({ username });
    return findusername;
  }

  async signin(username: string, password: string) {
    const usersign = await this.findbyusername(username);
    if (!usersign) {
      throw new UnauthorizedException(`Username not found`);
    }

    const validpassword = await bcrypt.compare(password, usersign.password);
    if (!validpassword) {
      throw new UnauthorizedException(`Password does not match`);
    }

    const payload = { sub: usersign.id, role: usersign.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: `${process.env.JWT_SECRET}`,
    });

    return { accessToken };
  }
}
