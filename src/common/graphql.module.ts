import { join } from 'path';

import { Request } from 'express';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { getPubSubInstance } from './pubsub.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'graphql/schema.gql'),
      sortSchema: true,
      csrfPrevention: false,
      installSubscriptionHandlers: true,
      introspection: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      playground: false,
      subscriptions: {
        'graphql-ws': {
          onConnect: (ctx) => {
            const sessionKey = ctx.connectionParams['x-session-key'];
            console.log('connect', sessionKey);
          },
          onDisconnect: (ctx) => {
            const sessionKey = ctx.connectionParams['x-session-key'];
            console.log('disconnect', sessionKey);
          },
        },
      },
      context: ({ req }: { req: Request }) => {
        if (req) {
          return { sessionKey: req.headers['x-session-key'] };
        }
      },
    }),
  ],
})
export default class DefaultGraphQLModule {}
