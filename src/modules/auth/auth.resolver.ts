import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/dto';
import { RegisterModel } from './models/models';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

@Resolver(() => User)
export class AuthResolver {
    constructor(private readonly authService:AuthService){}

    @Mutation(() => RegisterModel)
    async register(
        @Args('payload') payload: RegisterDto,
        @Args('avatar', { type: () => GraphQLUpload, nullable: true })
        avatar?: FileUpload,
        ): Promise<RegisterModel> {
            return this.authService.register(payload, avatar);
    }

    @Mutation(() => RegisterModel)
    login(@Args('payload') payload: LoginDto): Promise<RegisterModel> {
        return this.authService.login(payload)
    }
}
