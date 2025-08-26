import { NestFactory } from '@nestjs/core';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';

import { CoreModule } from './core/module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(CoreModule, new ExpressAdapter());

  app.enableCors();

  app.use(
    '/voyager',
    voyagerMiddleware({
      endpointUrl: '/graphql',
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
