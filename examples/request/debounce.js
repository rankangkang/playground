function debounce(fn, delay = 0) {
  let timer = null
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
      timer = null
    }, delay)
  }
}

function throttle(fn, interval = 0) {
  let timer = null

  return function(...args) {
    if (timer) {
      return
    }

    timer = setTimeout(() => {
      fn()
      timer = null
    }, interval)
  }
}