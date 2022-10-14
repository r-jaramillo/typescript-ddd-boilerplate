import { Event, EventAddress } from '@/_lib/events/Event';
const makeEventConsumer =
<S extends string = 'subscriber'>(subscriberKey: S = 'subscriber' as S) =>
<E extends Event<any>, D extends Record<string, any> | void = void, OPTS = any>(
  address: EventAddress<E['eventType'], E['topic']>,
  fn: (deps: D) => (event: E) => Promise<void>,
  opts: Partial<OPTS> = {}
) =>
(deps: D & { [key in S]: any }): void => {
  const { [subscriberKey]: subscriber } = deps;

  subscriber.add(address, fn(deps), opts);
};

const eventConsumer = makeEventConsumer();

export { eventConsumer, makeEventConsumer };
