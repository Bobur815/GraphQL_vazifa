import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { PostResolver } from './posts.resolver';

@Module({
  imports:[PrismaModule],
  providers: [PostsService,PostResolver],
  exports:[PostsService]
})
export class PostsModule {}
