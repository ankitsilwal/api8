import { Body, Controller, Get, HttpException, Post } from "@nestjs/common";
import { BookService } from "./book.service";
import { BookDto } from "./dto/createbook.dto";

@Controller("book")
export class BookController {
  constructor(private bookservice: BookService) {}

  @Post("add")
  async creatbook(@Body() bookdto: BookDto) {
    try {
      return await this.bookservice.createbook(bookdto);
    } catch (error) {
      throw new HttpException(error.message, error.statuscode ?? 400);
    }
  }

  @Get()
  async getallbooks(){
    return await this.bookservice.getallbooks()
  }
}
