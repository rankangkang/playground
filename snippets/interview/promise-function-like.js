/**
 * @param {(resolve, reject) => any} excutor 
 */
function P(excutor) {
  this.status = 'pending';
  this.value = undefined;
  this.reason = undefined;
  this.onResolvedCallbacks = [];
  this.onRejectedCallbacks = [];

  const resolve = (value) => {
    if (this.status === 'pending') {
      this.value = value;
      this.status = 'resolved';
      setTimeout(() => {
        this.onResolvedCallbacks.forEach(cb => cb(value));
      });
    }
  }

  const reject = (reason) => {
    if (this.status === 'pending') {
      this.reason = reason;
      this.status = 'rejected';
      setTimeout(() => {
        this.onRejectedCallbacks.forEach(cb => cb(reason));
      });
    }
  }

  try {
    excutor(resolve, reject);
  } catch (error) {
    reject(error)
  }
}

/**
 * 
 * @param {(data: any) => any} onResolve 
 * @param {(error: any) => any} onRejected 
 */
P.prototype.then = function (onResolve, onRejected) {
  if (this.status === 'fulfilled') {
    return new P((resolve, reject) => {
      try {
        const value = onResolve(this.value);
        resolve(value);
      } catch (error) {
        reject(error);
      }
    });
  }

  if (this.status === 'rejected') {
    return new P((resolve, reject) => {
      try {
        const value = onRejected(this.reason);
        resolve(value);
      } catch (error) {
        reject(error);
      }
    })
  }

  return new P((resolve, reject) => {
    this.onResolvedCallbacks.push((value) => {
      try {
        const nextValue = onResolve(value);
        resolve(nextValue);
      } catch (error) {
        reject(error);
      }
    })
    this.onRejectedCallbacks.push((reason) => {
      try {
        const nextValue = onRejected(reason);
        resolve(nextValue);
      } catch (error) {
        reject(error);
      }
    })
  })
}

const testP = new P((resolve, reject) => {
  console.log('start');
  setTimeout(() => {
    console.log('resolve')
    resolve(1);
  }, 1000);
  setTimeout(() => {
    console.log('reject')
    reject(2);
  }, 2000);
})

testP.then((data) => {
  console.log('resolve', data);
  throw 3;
}).then(() => { }, (data) => {
  console.log('resolve2', data);
})