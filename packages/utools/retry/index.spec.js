import { createRetry } from './index.js'

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
