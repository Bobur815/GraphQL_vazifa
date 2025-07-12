import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  body: string;

  @Field(() => Int)
  userId: number;
}

@InputType()
export class UpdatePostDto extends PartialType(CreatePostInput){}
