import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateBookInput {

    @Field(() => Int)
    id: number

    @Field()
    title: string

    @Field(() => Int)
    price: number

}