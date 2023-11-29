// promise:
// excutor: (resolveFn, rejectFn) => void
// resolveFn: (data) => void
// rejectFn: (reason) => void

// p.then: (onResolve: (data) => any) => Promise
// p.catch: (onReject: (reason) => any) => Promise
// p.finally: (onFinally: () => any) => Promise

class SimplePromise {
  static status = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
  }

  state
  data
  reason

  _onResolveFns = []
  _onRejectFns = []

  constructor(excutor) {
    // 将 resolveFn、rejectFn 传入 excutor 运行
    this.state = SimplePromise.status.PENDING
    try {
      // resolve 在调用时触发 resolveFns
      excutor(this._resolve.bind(this), this._reject.bind(this))
    } catch (error) {
      this._resolve(error)
    }
  }

  _resolve(data) {
    if (this.state !== SimplePromise.status.PENDING) {
      return
    }
    this.state = SimplePromise.status.FULFILLED
    this.data = data
    this._onResolveFns.forEach((fn) => {
      fn(data)
    })
  }

  _reject(reason) {
    if (this.state !== SimplePromise.status.PENDING) {
      return
    }
    this.state = SimplePromise.status.REJECTED
    this.reason = reason
    this._onRejectFns.forEach((fn) => {
      fn(reason)
    })
  }

  then(onResolve, onReject) {
    if (typeof onResolve === 'function') {
      this._onResolveFns.push(onResolve)
    }
    if (typeof onReject === 'function') {
      this._onRejectFns.push(onReject)
    }
  }

  catch(onReject) {
    if (typeof onResolve !== 'function') {
      throw new Error('必须是一个函数')
    }
    this._onRejectFns.push(onReject)
  }
}

console.log(1)
const sp = new SimplePromise((resolve, reject) => {
  console.log(2)
  resolve('promise')
})
console.log(3)
sp.then((res) => {
  console.log(4, res)
})
console.log(5)
