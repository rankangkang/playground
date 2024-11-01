// 并发控制 promise 运行
function concurrentRun(promiseCreators, concurrency = 1) {
  let runningCount = 0
  const waitPool = promiseCreators.map((item, idx) => ({ fn: item, index: idx }))
  const results = new Map()
  let resolveFn

  function run(task) {
    runningCount++
    const { fn, index } = task
    fn()
      .then((res) => {
        const result = { status: 'fulfilled', data: res }
        console.log(result)
        results.set(index, result)
      })
      .catch((err) => {
        const reason = { status: 'rejected', error: err }
        console.log(reason)
        results.set(index, reason)
      })
      .finally(() => {
        next()
      })
  }

  // 运行下一个任务
  function next() {
    runningCount--
    if (waitPool.length === 0 && runningCount === 0) {
      // 任务全部执行完成
      return resolveFn(convertNumberKeyMapToArray(results))
    }

    if (waitPool.length > 0) {
      const p = waitPool.shift()
      run(p)
    }
  }

  return new Promise((resolve) => {
    resolveFn = resolve
    // 开启运行
    while (runningCount < concurrency) {
      const p = waitPool.shift()
      if (p) {
        run(p)
      }
      if (runningCount === concurrency || waitPool.length === 0) {
        break
      }
    }
  })
}

// map 转数组
function convertNumberKeyMapToArray(map) {
  return Array.from(map.entries())
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([_, value]) => value)
}

function mockPromise(index) {
  return new Promise((resolve, reject) => {
    const seed = Math.random()
    const delay = parseInt(seed * 1000)
    setTimeout(() => (seed > 0.5 ? resolve(index) : reject(index)), delay)
  })
}

;(async () => {
  const promises = new Array(99).fill(null).map((_, idx) => () => mockPromise(idx))
  const ids = await concurrentRun(promises, 10)
  console.log(ids)
})()
