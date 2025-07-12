import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  constructor(private readonly prisma:PrismaService){}

  async findAll() {
    const users = await this.prisma.user.findMany({
      include:{
        posts:true
      }
    })
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where:{id}
    })

    if(!user){
      throw new NotFoundException("User not found")
    }
    
    return user ? user : [] 
  }

  async createUser(payload: CreateUserInput){
    const newUser = await this.prisma.user.create({
      data:payload
    })
    return newUser
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.prisma.user.findUnique({where:{id}})

    if(!user){
      throw new NotFoundException("User not found")
    }

    const updatedUser = await this.prisma.user.update({
      where:{id},
      data: updateUserInput
    })

    return updatedUser
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({where:{id}})
    if(!user){
      throw new NotFoundException("User not found")
    }

    try {
      await this.prisma.user.delete({where:{id}})
      return "User successfully deleted"
    } catch (error) {
      console.log(error);
      
    }
  }
}
