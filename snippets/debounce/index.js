/**
 * 防抖
 * @template T
 * @param {T extends Function ? T : never} fn
 * @param {Object} option - 配置
 * @param {number} option.delay - debounce 延时
 * @param {boolean} option.immediate - 首次是否立即执行
 * @returns {T}
 */
export function debounce(func, option = {}) {
  const { delay, immediate } = Object.assign({}, { delay: 500, immediate: false }, option)
  if (immediate) {
    return immediateDebounce(func, delay)
  }
  return simpleDebounce(func, delay)
}

// 非立即执行的 debounce
function simpleDebounce(func, wait) {
  let result
  let timeout

  return function (...args) {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      result = func.apply(this, [...args])
      timeout = null
    }, wait)

    return result
  }
}

// 立即执行的 debounce（leading（定时开始前）与 trailing（定时结束后）均会执行）
export function immediateDebounce(func, wait) {
  // 运行结果
  let result
  // trailing（定时结束后）是否可触发
  let canTrailingRun
  // 时间戳，在每次 debounced 调用时赋值，配合 Date.now() 计算是否需要调用 func
  let timestamp
  // timer id
  let timeout

  return function debounced(...args) {
    const context = this
    timestamp = Date.now()

    // 递归运行
    const run = () => {
      const passed = Date.now() - timestamp
      if (passed > wait) {
        // passed > wait 说明 wait 时间段内无事件触发
        // 此时可以执行 func（trailing 可以触发时则触发）
        timeout = null
        if (canTrailingRun) {
          result = func.apply(context, [...args])
          // trailing 已经执行，将 canTrailingRun 置为 false
          canTrailingRun = false
        }
      } else {
        // passed <= wait 说明 wait 时间段内又有事件触发；
        // 此时不可执行 func，我们继续将func延迟到指定时间后；
        // 此后 trailing 可以被触发，将 canTrailingRun 状态置为 true
        timeout = setTimeout(run, wait - passed)
        canTrailingRun = true
      }
    }

    // 首次立即执行
    if (!timeout) {
      // 执行 leading（定时开始前）
      result = func.apply(context, [...args])
      canTrailingRun = false
    }

    timeout = setTimeout(run, wait)

    return result
  }
}
