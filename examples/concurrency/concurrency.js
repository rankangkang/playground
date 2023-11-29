function mockRequest(delay) {
  return new Promise((resolve) => {
    // const delay = parseInt(Math.random() * 1000)
    setTimeout(() => resolve(delay))
  })
}

function concurrency(fns, maxConcurrency) {
  const results = []
  const queue = []
  let running = 0

  return new Promise((resolve) => {
    fns.forEach((item, idx) => {
      queue.push(item)
      ;(async function run(resolve) {
        if (running < maxConcurrency) {
          const fn = queue.shift()
          if (fn) {
            running++
            fn()
              .then((res) => {
                results.push(res)
              })
              .catch((err) => results.push(err))
              .finally(() => {
                running--
                if (results.length === fns.length) {
                  resolve(results)
                } else {
                  run(resolve)
                }
              })
          }
        }
      })(resolve, idx)
    })
  })
}

;(async () => {
  console.time('concurrency')
  const fns = new Array(100).fill(null).map((_, idx) => () => mockRequest(idx))
  const ids = await concurrency(fns, 10)
  console.timeEnd('concurrency')

  console.log(ids)
})()
