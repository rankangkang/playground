/* eslint-disable @typescript-eslint/no-this-alias */
const PENDING = 'pending'
const REJECTED = 'rejected'
const FULFILLED = 'fulfilled'

function P(executor) {
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
    if (value instanceof P) {
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
P.prototype.then = function (onResolved, onRejected) {
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
    return new P((resolve, reject) => {
      try {
        const nextData = onResolved(self.data)
        if (nextData instanceof P) {
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
    return new P((resolve, reject) => {
      try {
        const nextData = onRejected(self.reason)
        if (nextData instanceof P) {
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
    return new P((resolve, reject) => {
      self.onResolvedCallbacks.push(function (value) {
        try {
          const nextData = onResolved(self.data)
          if (nextData instanceof P) {
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
          if (nextData instanceof P) {
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

P.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

console.log(1)

const p = new P((resolve) => {
  console.log(2)
  setTimeout(() => {
    console.log(3)
    resolve('data')
    console.log(4)
  }, 1000)
  console.log(5)
})

console.log(6)

p.then((data) => {
  console.log(7)
  console.log('data:', data)
  return 'nextData'
})
  .then((data) => {
    console.log(8)
    console.log('data:', data)
    // eslint-disable-next-line no-throw-literal
    throw 'error'
  })
  .catch((e) => {
    console.log(9)
    console.log('error', e)
  })

console.log()
