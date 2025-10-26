import { Global, Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { REDIS_STREAMS } from 'src/common/symbols';
import { RedisStreams } from 'src/common/redis';
import StreamsPublishEvent from './StreamsPublish.event';

@Global()
@EventsHandler(StreamsPublishEvent)
export default class StreamsPublishHandler<T> implements IEventHandler<StreamsPublishEvent<T>> {
  constructor(
    @Inject(REDIS_STREAMS)
    private streams: RedisStreams,
  ) {}
  async handle({ trigger, payload }: StreamsPublishEvent<T>) {
    await this.streams.publish<T>(trigger, payload);
  }
}
