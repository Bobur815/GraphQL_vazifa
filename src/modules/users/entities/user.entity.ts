import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Post } from "src/modules/posts/entities/posts.entities";

@ObjectType()
export class User {
    @Field(() => Int)
    id:number

    @Field()
    name: string

    @Field()
    email:string

    @Field(() => [Post], {nullable:true})
    posts?:Post[];
}
