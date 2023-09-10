import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber } from "class-validator";

@InputType()
export class AddBookInput {

    @Field()
    @IsNotEmpty()
    title: string

    @Field(() => Int)
    @IsNotEmpty()
    @IsNumber()
    price: number

}