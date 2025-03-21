// infer 通常在条件判断中与 extends 一同出现，表示将要推断的类型变量，推断的类型变量可以在条件类型的 true 分支被引用

export type InferTypeArray<T> = T extends (infer R)[] ? R : T

// 推断方法返回值
export type FunctionReturnType<T extends Function> = T extends (...args: any[]) => infer R
  ? R
  : unknown

// 推断方法入参列表类型
export type FunctionParameters<T extends Function> = T extends (...args: infer P) => any
  ? P
  : unknown
