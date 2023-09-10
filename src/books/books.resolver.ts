import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BooksService } from "./books.service";
import { Book } from "./entities/book.entity";
import { AddBookInput } from "./dto/add-book.input";
import { UpdateBookInput } from "./dto/update-book.input";

@Resolver(() => Book)
export class BooksResolver {

    constructor(private readonly bookService: BooksService) { }

    @Query(() => [Book], { name: 'getAllBooks' })
    getAllBooks() {

        return this.bookService.getAllBooks()

    }

    @Query(() => Book, { name: 'getBookById' })
    getBookById(@Args({ name: 'bookId' }) id: number) {

        return this.bookService.getBookById(id)

    }

    @Mutation(() => String, { name: 'deleteBook' })
    deleteBook(@Args({ name: 'bookId' }) id: number) {

        return this.bookService.deleteBook(id)

    }

    @Mutation(() => Book, { name: 'addBook' })
    addBook(@Args('addBookInput') addBookInput: AddBookInput) {

        return this.bookService.addBook(addBookInput)

    }

    @Mutation(() => Book, { name: 'updateBook' })
    updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {

        return this.bookService.updateBook(updateBookInput)

    }

}