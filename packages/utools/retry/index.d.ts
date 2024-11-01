type Run = <T>(fn: () => Promise<T>) => Promise<T>
type Option = {
  delay?: number
  maxRetries?: number
  logger?: (...messages: any[]) => void
}

declare function createRetry(options: Option): Run

export { createRetry }
export default createRetry
