import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Book } from "./book.schema";
import mongoose, { Model, ObjectId } from "mongoose";
import { BookDto } from "./dto/createbook.dto";
import { UpdateBookDto } from "./dto/updatebook.dto";

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async createbook(bookdto: BookDto, bookId: string): Promise<Book> {
    const bookcreation = await this.bookModel.create({
      ...bookdto,
      author: new mongoose.Types.ObjectId(bookId),
    });
    if (!bookcreation) {
      throw new BadRequestException(`Invalid Details`);
    }
    return bookcreation;
  }

  async getallbooks(): Promise<Book[]> {
    const getall = await this.bookModel
      .find()
      .populate("author", { password: 0, role: 0 });
    if (!getall) {
      throw new NotFoundException(`There is nothing`);
    }
    return getall;
  }

  async getbyid(
    bookId: mongoose.Types.ObjectId,
    authorId: mongoose.Types.ObjectId
  ) {
    const getbook = await this.bookModel
      .findOne({ _id: bookId, author: new mongoose.Types.ObjectId(authorId) })
      .populate("author", { password: 0, role: 0 });
    if (!getbook) {
      throw new NotFoundException(`Book not found`);
    }
    return getbook;
  }

  async updatebook(
    bookId: mongoose.Types.ObjectId,
    authorid: mongoose.Types.ObjectId,
    updatebookdto: UpdateBookDto
  ) {
    const updatebyid = await this.bookModel.findOneAndUpdate(
      { _id: bookId, author: new mongoose.Types.ObjectId(authorid) },
      updatebookdto,
      { new: true }
    );
    if (!updatebyid) {
      throw new BadRequestException(`Invalid Details or ID`);
    }
    return updatebyid;
  }

  async deletebyid(
    bookId: mongoose.Types.ObjectId,
    authorid: mongoose.Types.ObjectId
  ) {
    const deletebyid = await this.bookModel.findOneAndDelete({
      _id: bookId,
      author: new mongoose.Types.ObjectId(authorid),
    });
    if (!deletebyid) {
      throw new NotFoundException(`Book Not Found`);
    }
    return deletebyid;
  }
}
