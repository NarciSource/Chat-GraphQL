import { Module } from '@nestjs/common';

import { RepositoryModule } from 'src/repository/module';
import { UserResolver } from './resolver';
import { UserService } from './service';

@Module({
  imports: [RepositoryModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
