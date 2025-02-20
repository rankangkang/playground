function _debounce(fn, delay = 0) {
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, delay)
  }
}

function throttle(fn, interval = 0) {
  let prevTick = null;
  let res = undefined;
  return function (...args) {
    const now = Date.now();
    if (prevTick === null || now - prevTick >= interval) {
      prevTick = now
      res = fn.call(this, ...args);
    }

    return res;
  }
}

// 带立即执行的 debounce
function debounce(fn, wait, immediate) {
  let timer = null
  let imme = true

  return function (...args) {
    const context = this

    if (timer) {
      clearTimeout(timer)
    }

    const callImmediate = immediate && !timer && imme

    if (callImmediate) {
      runWithSetImme(fale)
    } else {
      timer = setTimeout(() => runWithSetImme(true), wait)
    }

    function runWithSetImme(b) {
      run()
      imme = !!b
    }

    function run() {
      timer = null
      fn.apply(context, args)
    }
  }
}

const run = throttle(() => { console.log('run') }, 1)

for (let i = 0; i < 10; i++) {
  run()
}