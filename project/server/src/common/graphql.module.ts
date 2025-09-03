import { join } from 'path';

import { Request } from 'express';
import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { getPubSubInstance } from './pubsub.module';

const logger = new Logger('GraphQLModule');

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'graphql/schema.gql'), // 스키마를 자동으로 생성하고 파일로 저장
      sortSchema: true, // 스키마 정의를 알파벳 순
      csrfPrevention: false, // CSRF(Cross-Site Request Forgery) 보호 기능 비활성화
      installSubscriptionHandlers: true, // // WebSocket 기반 Subscription 핸들러를 설치
      introspection: true, // GraphQL 스키마 introspection 허용
      plugins: [ApolloServerPluginLandingPageLocalDefault()], // 로컬에서 테스트용 Apollo Landing Page UI를 활성화
      playground: false, // 기본 플레이그라운드 비활성화, 플러그인 대체 사용
      subscriptions: {
        'graphql-ws': {
          onConnect: (ctx) => {
            // WS 파라미터에서 세션키 추출
            const sessionKey = ctx.connectionParams['x-session-key'] as string;
            logger.log(`클라이언트 연결: ${sessionKey}`);
          },
          onDisconnect: async (ctx) => {
            const sessionKey = ctx.connectionParams['x-session-key'] as string;
            logger.log(`클라이언트 연결 해제: ${sessionKey}`);

            // PubSub으로 연결 해제 퍼블리싱
            const pubsub = getPubSubInstance();
            if (pubsub) {
              await pubsub.publish('disconnect', { sessionKey });
            }
          },
        },
      },
      context: ({ req }: { req: Request }) => {
        // HTTP 헤더에서 세션키 추출
        if (req) {
          return { sessionKey: req.headers['x-session-key'] };
        }
      },
    }),
  ],
})
export default class DefaultGraphQLModule {}
