import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { BookService } from "./book.service";
import { BookDto } from "./dto/createbook.dto";
import mongoose from "mongoose";
import { UpdateBookDto } from "./dto/updatebook.dto";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { UserRoles } from "src/auth/decorator/role.decorator";
import { UserRole } from "src/auth/dto/user.dto";

@UseGuards(AuthGuard, RolesGuard)
@Controller("book")
export class BookController {
  constructor(private bookservice: BookService) {}

  @UserRoles(UserRole.ADMIN)
  @Post("add")
  async creatbook(@Body() bookdto: BookDto, @Request() req: any) {
    try {
      const authorid = req.user.sub;
      return await this.bookservice.createbook(bookdto, authorid);
    } catch (error) {
      throw new HttpException(error.message, error.statuscode ?? 400);
    }
  }

  @UserRoles(UserRole.ADMIN)
  @Get()
  async getallbooks() {
    return await this.bookservice.getallbooks();
  }

  @UserRoles(UserRole.ADMIN)
  @Get(":id")
  async getbyid(
    @Param("id") bookId: mongoose.Types.ObjectId,
    @Request() req: any
  ) {
    const authorid: mongoose.Types.ObjectId = req.user.sub;
    return await this.bookservice.getbyid(bookId, authorid);
  }
  @UserRoles(UserRole.ADMIN)
  @Put(":id")
  async updatebyid(
    @Param("id") bookid: mongoose.Types.ObjectId,
    @Body() updatedto: UpdateBookDto,
    @Request() req: any
  ) {
    const author = req.user.sub;
    return await this.bookservice.updatebook(bookid, author, updatedto);
  }
  @UserRoles(UserRole.ADMIN)
  @Delete(":id")
  async deletebyid(
    @Param("id") bookId: mongoose.Types.ObjectId,
    @Request() req: any
  ) {
    const authorid = req.user.sub;
    const deletedbook = await this.bookservice.deletebyid(bookId, authorid);
    return { message: "Book Deleted" };
  }
}
