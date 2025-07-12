import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PostsService } from "./posts.service";
import { Post } from "./entities/posts.entities";
import { CreatePostInput, UpdatePostDto } from "./dto/dto";
import { HttpExceptionFilter } from "src/common/middleware/error-handler";
import { UseFilters } from "@nestjs/common";

@Resolver(() => Post)
@UseFilters(new HttpExceptionFilter())
export class PostResolver{
    constructor(private readonly postService:PostsService){}

    @Query(()=> [Post], {name:'findAllPosts'})
    findAllPosts(): Promise<Post[]> {
        return this.postService.findAll()
    }

    @Query(() => Post, {name:'findOnePost'})
    findOnePost(id:number){
        return this.postService.findOne(id)
    }

    @Mutation(() => Post, {name: 'createPost'})
    createPost(@Args('payload') payload:CreatePostInput){
        return this.postService.createPost(payload)
    }

    @Mutation(() => Post, {name:'updatePost'})
    updatePost(@Args('payload') payload:UpdatePostDto, @Args('id') id:number){
        return this.postService.updatePost(id,payload)
    }

    @Mutation(() => String)
    deletePost(@Args('id') id:number){
        return this.postService.deletePost(id)
    }
}