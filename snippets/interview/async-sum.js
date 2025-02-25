/** 腾讯二面面试题 */


function asyncAdd(a, b, callback) {
  setTimeout(() => {
    callback(a + b)
  }, 1000)
}

async function total() {
  console.time('s1')
  const s1 = await sum(1, 2, 3, 4, 5, 6, 7, 8, 9)
  console.timeEnd('s1')

  console.time('s2')
  const s2 = await sumWithoutAsync(1, 2, 3, 4, 5, 6, 7, 8, 9)
  console.timeEnd('s2')

  console.time('s3')
  const s3 = await sumWithDivideAndConquer(1, 2, 3, 4, 5, 6, 7, 8, 9)
  console.timeEnd('s3')

  console.log(s1, s2, s3)
}

total()

// 以下是解答

function doAdd(a, b) {
  return new Promise((resolve, reject) => {
    asyncAdd(a, b, resolve)
  })
}

/** 在不是用加法的基础上，仅调用 asyncAdd 实现加法 */
async function sum(...args) {
  if (args.length <= 1) {
    return args[0]
  }

  let res = args[0];
  for (let i = 1; i < args.length; i++) {
    res = await doAdd(res, args[i]);
  }

  return res;
}

// 上面的 promise 版本
function sumWithoutAsync(...args) {
  return new Promise((resolve, reject) => {
    if (args.length <= 1) {
      return args[0]
    }

    let resPromise = Promise.resolve(args[0])
    for (let i = 1; i < args.length; i++) {
      resPromise = resPromise.then(data => {
        return doAdd(data, args[i])
      })
    }

    resolve(resPromise)
  })
}

// 可优化的分治版本，用 Promise.all 求和，时间减半
/**
 * 
 * @param  {...any} args 
 * @returns {Promise<number>}
 */
function sumWithDivideAndConquer(...args) {
  if (args.length <= 1) {
    return Promise.resolve(args[0] || 0)
  }

  if (args.length === 2) {
    return doAdd(...args)
  }

  const index = Math.floor(args.length / 2)
  const rs = Promise.all([sumWithDivideAndConquer(...args.slice(0, index)), sumWithDivideAndConquer(...args.slice(index))])
  return rs.then(data => {
    return doAdd(...data)
  })
}
