import { Query } from '@nestjs/cqrs';

export default class GetUsersQuery extends Query<string[]> {
  constructor() {
    super();
  }
}
