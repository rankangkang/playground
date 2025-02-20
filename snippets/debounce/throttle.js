/**
 * 节流函数
 * @param {Function} fn 
 * @param {number} interval 
 * @returns 
 * @description 不要使用 setTimeout 实现节流，会导致延时，体验不好
 */
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