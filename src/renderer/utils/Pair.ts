'use strict';

// lodash.toPairs lose the information on the key -> key: string
export function toPairs<T extends object, K extends keyof T>(o: T) {
  return Object.entries(o) as Array<[K, T[K]]>;
}

export function fromPairs<K extends keyof any, V>(pairs: Array<[K, V]>): Record<K, V> {
  return pairs.reduce(
    (o, [k, v]) => Object.assign(o, { [k]: v }),
    Object.create(null) as Record<K, V>
    // {} as Record<K, T>
  );
}

export const snd = <T>([, second]: [any, T]): T => second;
export const flip = <A, B>([first, second]: [A, B]): [B, A] => [second, first];

export function hasSecond<A, B>(pair: [A, B]): pair is [A, NonNullable<B>] {
  return snd(pair) != null;
}

export function mapSecond<A, B, BU>(mapper: (second: B) => BU) {
  return ([first, second]: [A, B]): [A, BU] => [first, mapper(second)];
}
