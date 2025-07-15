
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from './database/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLExceptionFilter } from './common/middleware/error-handler';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      
      driver: ApolloDriver,
      graphiql:true,
      playground:true,
      autoSchemaFile:true,
      context: ({ req, res }) => ({ req, res }),
    }),
    PrismaModule,
    UsersModule,
    PostsModule,
    AuthModule,
  ],
  providers: [
      {
        provide: APP_FILTER,
        useClass: GraphQLExceptionFilter,
      },
  ],
})
export class AppModule {}
