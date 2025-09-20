export default class PubSubPublishEvent<T> {
  constructor(
    public readonly trigger: string,
    public readonly payload: T,
  ) {}
}
