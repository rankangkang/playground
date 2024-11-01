declare function concurrentRun<T>(
  promiseCreators: Array<() => Promise<T>>,
  concurrency?: number,
  options?: {
    returnWhileReject?: boolean
    logger: (...args: any[]) => void
  },
): Promise<Array<{ status: 'fulfilled'; data: T } | { status: 'rejected'; error: any }>>

export { concurrentRun }
export default concurrentRun
