import { Query } from '@nestjs/cqrs';

export default class GetPartitionsQuery extends Query<string[]> {
  constructor(public readonly roomId: string) {
    super();
  }
}
