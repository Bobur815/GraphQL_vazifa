import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import { GraphQLExceptionFilter} from './common/middleware/error-handler';
import { graphqlUploadExpress } from 'graphql-upload-ts';

async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GraphQLExceptionFilter());
  const PORT = process.env.PORT ?? 3001;
  app.use(graphqlUploadExpress({ maxFileSize: 10_000_000, maxFiles: 1 }));
  await app.listen(PORT, () => console.log(`Server is running on ${PORT}`)
  );
}
bootstrap();
