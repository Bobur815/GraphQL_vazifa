
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from './database/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      
      driver: ApolloDriver,
      graphiql:true,
      playground:true,
      autoSchemaFile:true
    }),
    PrismaModule,
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
