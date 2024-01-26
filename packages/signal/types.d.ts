type Signal<T> = [getter: () => T, setter: (s: T) => void]
export declare function createSignal<T = any>(data: T): Signal<T>
export declare function createEffect(effect: () => any): void
export declare function createMemo<T>(memo: () => T): () => T
