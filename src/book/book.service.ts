import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Book } from "./book.schema";
import mongoose, { Model } from "mongoose";
import { BookDto } from "./dto/createbook.dto";
import { UpdateBookDto } from "./dto/updatebook.dto";

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async createbook(bookdto: BookDto): Promise<Book> {
    const bookcreation = await this.bookModel.create(bookdto);
    if (!bookcreation) {
      throw new BadRequestException(`Invalid Details`);
    }
    return bookcreation;
  }

  async getallbooks(): Promise<Book[]> {
    const getall = await this.bookModel.find();
    if (!getall) {
      throw new NotFoundException(`There is nothing`);
    }
    return getall;
  }

  async getbyid(bookId: mongoose.Types.ObjectId) {
    const getbook = await this.bookModel.findById(bookId);
    if (!getbook) {
      throw new NotFoundException(`Book not found`);
    }
    return getbook;
  }

  async updatebook(
    bookId: mongoose.Types.ObjectId,
    updatebookdto: UpdateBookDto
  ) {
    const updatebyid = await this.bookModel.findByIdAndUpdate(
      bookId,
      updatebookdto
    );
    if (!updatebyid) {
      throw new BadRequestException(`Invalid Details or ID`);
    }
    return updatebyid;
  }

  async deletebyid(bookId: mongoose.Types.ObjectId) {
    const deletebyid = await this.bookModel.findByIdAndDelete(bookId);
    if (!deletebyid) {
      throw new NotFoundException(`Book Not Found`);
    }
    return deletebyid;
  }
}
