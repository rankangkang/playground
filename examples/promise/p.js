const PENDING = 'pending'
const REJECTED = 'rejected'
const FULFILLED = 'fulfilled'

class P {
  status = PENDING
  data
  reason
  onResolvedCallbacks = []
  onRejectedCallbacks = []

  resolve(value) {
    if (value instanceof P) {
      return value.then(this.resolve.bind(value), this.reject.bind(value))
    }

    setTimeout(() => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.data = value
        this.onResolvedCallbacks.forEach((cb) => cb(value))
      }
    })
  }

  reject(reason) {
    setTimeout(() => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach((cb) => cb(reason))
      }
    })
  }

  constructor(excutor) {
    try {
      excutor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  then(onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : (value) => value
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => reason

    // if (this.status === FULFILLED) {
    //   return new P((res, rej) => {
    //     setTimeout(() => {

    //     })
    //   })
    // }
  }

  catch(onRejected) {
    // TODO
  }
}
