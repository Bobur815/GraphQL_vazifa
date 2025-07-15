import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RegisterModel {
    @Field()
    accessToken:string

    @Field()
    refreshToken:string

    @Field({ nullable: true })
    avatarUrl?: string;
}
