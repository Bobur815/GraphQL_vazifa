import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UseFilters, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guard/jwt-auth.guard';
import { GraphQLExceptionFilter } from 'src/common/middleware/error-handler';
import { RolesGuard } from 'src/common/guard/roles.guards';
import { Roles } from 'src/common/decorators/role.decorators';
import { UserRole } from 'src/common/type/user-roles';

@Resolver(() => User)
@UseFilters(new GraphQLExceptionFilter())
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(UserRole.ADMIN)
  @Query(()=> [User], {name:'findAll'})
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(()=> User)
  findOne(@Args('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(()=> User)
  createUser (@Args('payload') payload: CreateUserInput){
    return this.usersService.createUser(payload)
  }

  @Mutation(() => User)
  updateUser(@Args('payload', {type: () => UpdateUserInput}) payload: UpdateUserInput, @Args('id', {type: () => Int}) id:number){
    return this.usersService.update(id,payload)
  }

  @Mutation(() => String)
  deleteUser(@Args('id', {type: () => Int}) id:number){
    return this.usersService.remove(id)
  }

}
