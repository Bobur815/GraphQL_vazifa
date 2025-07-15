import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/dto';
import { RegisterModel } from './models/models';

@Resolver(() => User)
export class AuthResolver {
    constructor(private readonly authService:AuthService){}

    @Mutation(() => RegisterModel)
    register(@Args('payload') payload: RegisterDto): Promise<RegisterModel> {
        return this.authService.register(payload)
    }

    @Mutation(() => RegisterModel)
    login(@Args('payload') payload: LoginDto): Promise<RegisterModel> {
        return this.authService.login(payload)
    }
}
