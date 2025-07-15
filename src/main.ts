import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import { GraphQLExceptionFilter} from './common/middleware/error-handler';

async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GraphQLExceptionFilter());
  const PORT = process.env.PORT ?? 3001;

  await app.listen(PORT, () => console.log(`Server is running on ${PORT}`)
  );
}
bootstrap();
