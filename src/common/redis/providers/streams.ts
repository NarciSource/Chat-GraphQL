import Redis from 'ioredis';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type XReadArgs = Parameters<Redis['xread']>;

export default {
  provide: 'REDIS_STREAMS',
  useFactory: (configService: ConfigService) => {
    const logger = new Logger('RedisStreams');
    const host = configService.get<string>('REDIS_HOST', 'localhost');
    const port = configService.get<number>('REDIS_PORT', 6379);

    const redis = new Redis({ host, port });
    redis.on('ready', () => logger.log(`${host}:${port}에 연결 완료`));
    redis.on('error', (error) => logger.error(`${host}:${port}에 연결 실패`, error));

    return {
      publish: async function <T>(streamKey: string, payload: T) {
        await redis.xadd(
          streamKey,
          '*', // 자동 ID 생성
          ...Object.entries(payload).flatMap(([key, value]) => [key, JSON.stringify(value)]), // key-value 순으로 평탄화
        );
      },

      asyncIterator: async function* <T extends Record<string, unknown>>(
        streamKey: string,
        lastId = '0',
      ) {
        let id = lastId;

        while (true) {
          const xReadArgs = [
            ['BLOCK', 1000], // 메시지 블락 시간
            ['STREAMS', streamKey, id],
          ];

          const streams = await redis.xread(...(xReadArgs.flat() as XReadArgs));
          if (!streams) continue;

          const [_, messages] = streams[0]; // 단일 스트림
          for (const [messageId, fields] of messages) {
            id = messageId;

            // 필드 파싱
            const obj: Record<string, string> = {};
            for (let i = 0; i < fields.length; i += 2) {
              obj[fields[i]] = fields[i + 1];
            }

            // 객체 파싱
            const parsed: Record<string, unknown> = {};
            for (const [key, value] of Object.entries(obj)) {
              try {
                parsed[key] = JSON.parse(value);
              } catch {
                parsed[key] = value;
              }
            }

            yield parsed as T;
          }
        }
      },
    };
  },
  inject: [ConfigService],
};

export type RedisStreams = {
  publish: <T>(streamKey: string, payload: T) => Promise<void>;
  asyncIterator: <T extends Record<string, unknown>>(
    streamKey: string,
    lastId?: string,
  ) => AsyncGenerator<T>;
};
