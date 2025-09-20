import Redis from 'ioredis';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import InMemoryRepository from './InMemoryRepository';
import DatabaseRepository from './DatabaseRepository';

@Global()
@Module({
  providers: [
    {
      provide: 'IRepository', // 추상 레포지토리
      useFactory: (ConfigService: ConfigService, redisClient: Redis) => {
        // 구현체를 선택하는 팩토리 함수
        const repositoryType = ConfigService.get<string>('REPOSITORY_TYPE', 'simple');

        switch (repositoryType) {
          case 'InMemory':
            return new InMemoryRepository();
          case 'Database':
            return new DatabaseRepository(redisClient);
        }
      },
      inject: [ConfigService, 'REDIS_STORAGE'],
    },
  ],

  exports: ['IRepository'], // 다른 모듈에서는 인터페이스를 사용하여 의존성 주입을 받을 수 있도록 export
})
export default class RepositoryModule {}
