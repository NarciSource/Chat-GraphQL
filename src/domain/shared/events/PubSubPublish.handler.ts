import { Global, Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import PubSubPublishEvent from './PubSubPublish.event';

@Global()
@EventsHandler(PubSubPublishEvent)
export default class PubSubPublishHandler<T> implements IEventHandler<PubSubPublishEvent<T>> {
  constructor(
    @Inject('PUB_SUB')
    private readonly pubSub: RedisPubSub,
  ) {}
  async handle({ trigger, payload }: PubSubPublishEvent<T>) {
    await this.pubSub.publish<T>(trigger, payload);
  }
}
