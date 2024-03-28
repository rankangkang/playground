class P {
  onResolvedCallbacks = []
  onRejectedCallbacks = []

  status = 'pending'
  data = undefined
  reason = undefined

  constructor(executor) {
    // 同步运行 executor
    executor(this.onResolve.bind(this), this.onReject.bind(this))
  }

  onResolve(data) {
    this.data = data
    this.status = 'fulfilled'
    setTimeout(() => {
      this.onResolvedCallbacks.forEach(cb => cb(data))
    })
  }

  onReject(reason) {
    this.reason = reason
    this.status = 'rejected'
    setTimeout(() => {
      this.onRejectedCallbacks.forEach(cb => cb(reason))
    })
  }

  // 返回一个新的 Promise
  then(onResolveCallback, onRejectCallback) {
    onResolveCallback = typeof onResolveCallback === 'function' ? onResolveCallback : (v) => v
    onRejectCallback = typeof onRejectCallback === 'function' ? onRejectCallback : (r) => { throw r }

    const self = this
    if (self.status === 'fulfilled') {
      return new P((resolve, reject) => {
        try {
          const nextData = onResolveCallback(self.data)
          resolve(nextData)
        } catch (error) {
          reject(error)
        }
      })
    }

    if (self.status === 'rejected') {
      return new P((resolve, reject) => {
        try {
          const nextData = onRejectCallback(self.reason)
          resolve(nextData)
        } catch (error) {
          reject(error)
        }
      })
    }
    
    return new P((resolve, reject) => {
      this.onResolvedCallbacks.push(function (data) {
        try {
          const nextData = onResolveCallback(data)
          resolve(nextData)
        } catch (error) {
          reject(error)
        }
      })
      this.onRejectedCallbacks.push(function (reason) {
        try {
          const nextData = onResolveCallback(reason)
          resolve(nextData)
        } catch (error) {
          reject(error)
        }
      })
    })
  }
}