export default class StreamsPublishEvent<T> {
  constructor(
    public readonly trigger: string,
    public readonly payload: T,
  ) {}
}
