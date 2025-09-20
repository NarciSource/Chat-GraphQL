import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { IRepository } from 'src/repository';
import GetPartitionsQuery from './GetPartitions.query';

@QueryHandler(GetPartitionsQuery)
export default class GetPartitionsHandler implements IQueryHandler<GetPartitionsQuery> {
  constructor(
    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  execute({ roomId }: GetPartitionsQuery) {
    return this.repository.getRoomMembers(roomId);
  }
}
