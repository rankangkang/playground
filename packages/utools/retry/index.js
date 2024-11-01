const defaultConfig = {
  delay: 1000,
  maxRetries: 3,
  logger: console.log,
}

/**
 * 创建 retry
 * @param {Object} [option]
 * @param {number} [option.delay] 重试延迟，单位毫秒
 * @param {number} [option.maxRetries]
 * @param {(...args: any[]) => void} [option.logger]
 * @returns {<T>(fn: () => Promise<T>) => Promise<T>}
 */
export function createRetry(option = {}) {
  const { maxRetries, delay, logger } = Object.assign({}, defaultConfig, option)
  return async function (fn) {
    for (let i = 0; i <= maxRetries; i++) {
      try {
        return await fn()
      } catch (e) {
        logger('[RetryError]', `retry time: ${i};`, `reason: ${e}`)
        if (i === maxRetries) {
          // 超过重试次数限制
          throw e
        }
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }
}
