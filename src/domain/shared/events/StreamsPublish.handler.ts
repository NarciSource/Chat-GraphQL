import { Global } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { redis } from 'src/common/redis/streamIterator';
import StreamsPublishEvent from './StreamsPublish.event';

@Global()
@EventsHandler(StreamsPublishEvent)
export default class StreamsPublishHandler<T> implements IEventHandler<StreamsPublishEvent<T>> {
  constructor() {}
  async handle({ trigger, payload }: StreamsPublishEvent<T>) {
    const stringified = Object.fromEntries(
      Object.entries(payload).map(([key, value]) => [key, JSON.stringify(value)]),
    );

    await redis.xadd(
      trigger,
      '*', // 자동 ID 생성
      ...Object.entries(stringified).flat(), // key-value 순으로 평탄화
    );
  }
}
