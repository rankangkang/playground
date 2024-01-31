const PENDING = 'pending'
const REJECTED = 'rejected'
const FULFILLED = 'fulfilled'

function SP(executor) {
  let self = this
  self.status = PENDING
  self.data = undefined
  self.reason = undefined
  self.onResolvedCallbacks = []
  self.onRejectedCallbacks = []

  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }

  function resolve(value) {
    if (value instanceof SP) {
      return value.then(resolve, reject)
    }

    setTimeout(() => {
      if (self.status === PENDING) {
        self.status = FULFILLED
        self.data = value
        self.onResolvedCallbacks.forEach((cb) => cb(value))
      }
    })
  }

  function reject(reason) {
    setTimeout(() => {
      if (self.status === PENDING) {
        self.status = REJECTED
        self.reason = reason
        self.onRejectedCallbacks.forEach((cb) => cb(reason))
      }
    })
  }
}

// 调用 then 返回一个新的 promise
SP.prototype.then = function (onResolved, onRejected) {
  let self = this

  onResolved =
    typeof onResolved === 'function'
      ? onResolved
      : function (value) {
        return value
      }
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : function (reason) {
        throw reason
      }

  if (self.status === FULFILLED) {
    return new SP((resolve, reject) => {
      try {
        const nextData = onResolved(self.data)
        if (nextData instanceof SP) {
          nextData.then(resolve, reject)
        } else {
          resolve(nextData)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  if (self.status === REJECTED) {
    return new SP((resolve, reject) => {
      try {
        const nextData = onRejected(self.reason)
        if (nextData instanceof SP) {
          nextData.then(resolve, reject)
        } else {
          resolve(nextData)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  if (self.status === PENDING) {
    // 处于 pending 状态时，不能调用 onResolved 或 onRejected
    return new SP((resolve, reject) => {
      self.onResolvedCallbacks.push(function (value) {
        try {
          const nextData = onResolved(self.data)
          if (nextData instanceof SP) {
            nextData.then(resolve, reject)
          } else {
            resolve(nextData)
          }
        } catch (error) {
          reject(error)
        }
      })

      self.onRejectedCallbacks.push(function (value) {
        try {
          const nextData = onRejected(self.reason)
          if (nextData instanceof SP) {
            nextData.then(resolve, reject)
          } else {
            resolve(nextData)
          }
        } catch (error) {
          reject(error)
        }
      })
    })
  }
}

// Promise.prototype.catch
SP.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

// Promise.prototype.finally 本质上是一个 then
SP.prototype.finally = function (onFinally) {
  // onFinally 抛出错误会导致返回一个 rejected 状态的 Promise
  // 正常调用（未抛出错误）的 onFinally 是透明的，不会改变原始 Promise 状态
  return this.then(
    (value) => SP.resolve(onFinally()).then(() => value),
    (reason) => SP.resolve(onFinally()).then(() => { throw reason })
  )
}

// Promise.resolve
SP.resolve = function (value) {
  return new SP((resolve) => {
    if (value instanceof SP) {
      value.then((data) => {
        resolve(data)
      })
    } else {
      resolve(value)
    }
  })
}

// Promise.reject
SP.reject = function (value) {
  return new SP((_, reject) => {
    if (value instanceof SP) {
      value.then(data => {
        reject(data)
      }, (err) => {
        reject(err)
      })
    } else {
      reject(value)
    }
  })
}

/**
 * Promise.race
 * @param {Array<SP>} promises 
 * @returns 
 */
SP.race = function (promises) {
  return new SP((resolve, reject) => {
    promises.forEach(p => {
      p.then((data) => {
        resolve(data)
      }, (reason) => {
        reject(reason)
      })
    })
  })
}

/**
 * Promise.all
 * @param {Array<SP>} promises 
 * @returns 
 */
SP.all = function (promises) {
  return new SP((resolve, reject) => {
    // 所有 promise 执行完成后返回
    let result = []
    let pLength = promises.length
    let fulfilled = 0
    promises.forEach((p, idx) => {
      p.then((data) => {
        result[idx] = data
        fulfilled += 1
        // 校验所有 promise 是否已全部执行
        if (fulfilled === pLength) {
          resolve(result)
        }
      }, (reason) => {
        reject(reason)
      })
    })
  })
}

export default SP
