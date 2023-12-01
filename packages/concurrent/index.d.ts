declare function concurrentRun<T>(
  promiseCreators: Array<() => Promise<T>>,
  concurrency?: number,
  returnWhileReject?: boolean,
): Promise<Array<{ status: 'fulfilled'; data: T } | { status: 'rejected'; error: any }>>

export { concurrentRun }
export default concurrentRun
