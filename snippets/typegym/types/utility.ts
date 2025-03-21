// T 是 U 的类型，返回 never，否则返回 T
export type Exclude<T, U> = T extends U ? never : T

// 取交集，与 exclude 相反
export type Extract<T, U> = T extends U ? T : never

export type Pick<T, S extends keyof T> = {
  [P in S]: T[P]
}

// pick 相反
export type Omit<T, S extends keyof T> = Pick<T, Exclude<keyof T, S>>

export type Partial<T> = {
  [P in keyof T]?: T[P]
}

export type PartialPart<T, K extends keyof T> = Partial<T> & Pick<T, Exclude<keyof T, K>>

export type Required<T> = {
  [K in keyof T]-?: T[K]
}

export type RequiredPart<T, P extends keyof T> = Pick<T, Exclude<keyof T, P>> & Required<Pick<T, P>>

export type Record<K extends keyof any, V> = {
  [P in K]: V
}

export type Readonly<T extends object> = {
  readonly [P in keyof T]: T[P]
}
