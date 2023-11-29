declare function createSignal<T>(
  initialValue: T,
  options?: { equals?: false | ((prev: T, next: T) => boolean) },
): [get: () => T, set: (v: T) => T]

declare function createEffect<T>(fn: (v: T) => T, value?: T): void
