import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Post {
    @Field(() => Int)
    id:number

    @Field()
    title: string

    @Field()
    body:string

    @Field(() => Int)
    userId:number
}
