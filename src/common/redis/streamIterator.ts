import Redis from 'ioredis';

type XReadArgs = Parameters<Redis['xread']>;
export const redis = new Redis({ host: 'localhost', port: 6379 });

export async function* streamIterator<T extends Record<string, unknown>>(
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
}
