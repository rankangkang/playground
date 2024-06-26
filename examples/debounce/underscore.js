// underscope 实现
export default function debounce(func, wait, immediate) {
  let timeout, previous, args, result, context

  function now() {
    return Date.now()
  }

  function later() {
    let passed = now() - previous
    if (wait > passed) {
      timeout = setTimeout(later, wait - passed)
    } else {
      timeout = null
      if (!immediate) result = func.apply(context, args)
      // This check is needed because `func` can recursively invoke `debounced`.
      if (!timeout) args = context = null
    }
  }

  const debounced = function (..._args) {
    context = this
    args = _args
    previous = now()
    if (!timeout) {
      timeout = setTimeout(later, wait)
      if (immediate) result = func.apply(context, args)
    }
    return result
  }

  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = args = context = null
  }

  return debounced
}
