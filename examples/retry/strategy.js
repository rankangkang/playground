/**
 * 可停止的重试策略
 */
class RetryStrategy {
  static defaultOption = {
    delay: 1000,
    maxRetries: 3,
  }

  /**
   * 创建 RetryStartegy
   * @param {Object} option
   * @param {number} [option.delay] 重试延迟，单位毫秒
   * @param {number} option.maxRetries
   */
  constructor(option) {
    this.status = 'pending'
    this.data = undefined
    this.isStopped = false
    this.option = option
  }

  /**
   * 运行任务
   * @template T
   * @param {(fn: () => Promise<T>) => Promise<T>} fn
   */
  async run(fn) {
    const { maxRetries, delay } = this.option
    for (let i = 0; i <= maxRetries; i++) {
      try {
        this.data = await fn()
        this.status = 'fulfilled'
        return this.data
      } catch (e) {
        console.error('[RetryError]', `retry time: ${i};`, `reason: ${e}`)
        if (i === maxRetries || this.isStopped) {
          // 超过重试次数限制或被停止，直接返回
          this.data = e
          this.status = 'rejected'
          throw e
        }
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  // 停止 retry 执行，直接返回值
  stop() {
    this.isStopped = true
  }
}

/**
 * 创建 RetryStartegy
 * @param {Object} option
 * @param {number} [option.delay] 重试延迟，单位毫秒
 * @param {number} option.maxRetries
 * @returns {RetryStrategy}
 */
function createRetryStrategy(option) {
  const mergedOption = Object.assign({}, RetryStrategy.defaultOption, option)
  return new RetryStrategy(mergedOption)
}

function mockPromise() {
  return new Promise((resolve, reject) => {
    const seed = Math.random()
    setTimeout(() => {
      if (seed < 0.1) {
        return resolve(seed)
      }
      return reject(seed)
    }, 1000)
  })
}

const rs = createRetryStrategy({ delay: 500, maxRetries: 10 })
rs.run(mockPromise)
  .then((r) => {
    console.log('res ==>', r)
  })
  .catch((e) => {
    console.log('err ==>', e)
  })

setTimeout(() => {
  rs.stop()
}, 5000)
