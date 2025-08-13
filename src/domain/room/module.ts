import { Module } from '@nestjs/common';

import { RepositoryModule } from 'src/repository/module';
import { RoomResolver } from './resolver';
import { RoomService } from './service';

@Module({
  imports: [RepositoryModule],
  providers: [RoomResolver, RoomService],
})
export class RoomModule {}
