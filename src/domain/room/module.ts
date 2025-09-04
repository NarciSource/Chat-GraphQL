import { Module } from '@nestjs/common';

import RoomResolver from './resolver';
import RoomService from './service';

@Module({
  providers: [RoomResolver, RoomService],
})
export default class RoomModule {}
