const defaultConfig = {
  delay: 1000,
  maxRetries: 3,
}

/**
 * 创建 retry
 * @param {Object} option
 * @param {number} [option.delay] 重试延迟，单位毫秒
 * @param {number} option.maxRetries
 * @returns {<T>(fn: () => Promise<T>) => Promise<T>}
 */
function createRetry(option = {}) {
  const { maxRetries, delay } = Object.assign({}, defaultConfig, option)
  return async function (fn) {
    for (let i = 0; i <= maxRetries; i++) {
      try {
        return await fn()
      } catch (e) {
        console.error('[RetryError]', `retry time: ${i};`, `reason: ${e}`)
        if (i === maxRetries) {
          // 超过重试次数限制
          throw e
        }
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }
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

const run = createRetry({ delay: 1000, maxRetries: 10 })

run(mockPromise)
  .then((r) => {
    console.log(r)
  })
  .catch((e) => {
    console.error(e)
  })
