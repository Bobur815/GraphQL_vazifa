import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreatePostInput, UpdatePostDto } from './dto/dto';
import { Post } from './entities/posts.entities';

@Injectable()
export class PostsService {
    constructor(private readonly prisma:PrismaService){}

    async findAll(): Promise<Post[]>{
        const posts = await this.prisma.post.findMany({
            include:{
                user:true
            }
        })
        return posts
    }

    async findOne(id:number){
        const post = await this.prisma.post.findUnique({where:{id}})
        return post
    }

    async createPost(payload:CreatePostInput){
        const isUserExists = await this.prisma.user.findUnique({where:{id:payload.userId}})
        if(!isUserExists){
            throw new NotFoundException("User not found")
        }

        const newPost = await this.prisma.post.create({
            data:payload
        })
        return newPost
    }

    async updatePost(postId:number, payload:UpdatePostDto){
        const isPostExists = await this.prisma.post.findUnique({where:{id:postId}})
        if(!isPostExists){
            throw new NotFoundException("Post not found")
        }

        if(payload.userId){
            const isUserExists = await this.prisma.user.findUnique({where:{id:payload.userId}})
            if(!isUserExists){
                throw new NotFoundException("User not found")
            }
        }

        const updatedPost = await this.prisma.post.update({
            data:payload,
            where:{id:postId}
        })
        return updatedPost
    }

    async deletePost(id:number){
        const isPostExists = await this.prisma.post.findUnique({where:{id}})
        if(!isPostExists){
            throw new NotFoundException("Post not found")
        }

        await this.prisma.post.delete({where:{id}})
        return "Post deleted successfully"
    }
}
