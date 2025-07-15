import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  imports:[
    PrismaModule,
    JwtModule.register({
      global:true,
      secret:"olma",
      signOptions:{expiresIn:'10m'}
    })
  ],
  
  providers: [AuthResolver, AuthService]
})
export class AuthModule {}
