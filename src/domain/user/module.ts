import { Module } from '@nestjs/common';

import UserResolver from './resolver';
import UserService from './service';

@Module({
  providers: [UserResolver, UserService],
})
export default class UserModule {}
