import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserDto } from "./dto/user.dto";
import { UserSign } from "./dto/usersign.dto";

@Controller("user")
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post("add")
  async creatuser(@Body() userdto: UserDto) {
    const usercreation = await this.authservice.createuser(userdto);
    return usercreation;
  }

  @Post("auth")
  async usersign(@Body() usersign:UserSign){
    const userSign = await this.authservice.signin(usersign.username,usersign.password);
    return userSign;
  }
}
