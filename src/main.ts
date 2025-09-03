import { NestFactory } from '@nestjs/core';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';

import { CoreModule } from './core/module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(CoreModule, new ExpressAdapter());

  // CORS 설정 (필요에 따라 조정)
  app.enableCors();

  // graphQL voyager 추가
  app.use(
    '/voyager',
    voyagerMiddleware({
      endpointUrl: '/graphql',
    }),
  );

  // 애플리케이션 외부 포트에서 수신 대기
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
