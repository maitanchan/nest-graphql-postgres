import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Book } from "./entities/book.entity";
import { AddBookInput } from "./dto/add-book.input";
import { UpdateBookInput } from "./dto/update-book.input";

@Injectable()
export class BooksService {

    constructor(@InjectRepository(Book) private readonly bookRepository: Repository<Book>) { }

    async addBook(addBookInput: AddBookInput): Promise<Book> {

        const existingBook = await this.bookRepository.findOne({ where: { title: addBookInput.title } })

        if (existingBook) {

            throw new ConflictException("Book already exists")

        }

        const newBook = this.bookRepository.create(addBookInput)

        await this.bookRepository.save(newBook)

        return newBook

    }

    async updateBook(updateBookInput: UpdateBookInput): Promise<Book | null> {

        const book = await this.bookRepository.findOne({ where: { id: updateBookInput.id } })

        if (!book) {

            throw new NotFoundException('Book Not Found ')

        }

        book.title = updateBookInput.title
        book.price = updateBookInput.price

        await this.bookRepository.save(book)

        return book


    }

    async getAllBooks(): Promise<Book[]> {

        const books = await this.bookRepository.find()

        return books

    }

    async getBookById(id: number): Promise<Book> {

        const book = await this.bookRepository.findOne({ where: { id: id } })

        return book

    }

    async deleteBook(id: number): Promise<string> {

        await this.bookRepository.delete(id)

        return "Book has been deleted"

    }

}