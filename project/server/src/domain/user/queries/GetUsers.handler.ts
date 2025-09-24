import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { IRepository } from 'src/repository';
import GetUsersQuery from './GetUsers.query';

@QueryHandler(GetUsersQuery)
export default class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  execute() {
    return this.repository.getUsers();
  }
}
