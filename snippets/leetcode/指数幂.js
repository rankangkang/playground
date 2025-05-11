/**
 * 递归解法，x^n = n^(2*p + q) = (n * n)^p * n^q
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
let myPow = function (x, n) {
  // 处理负指数，减小误差
  if (n < 0) {
    return 1 / myPow(x, Math.abs(n))
  }

  if (n === 0) {
    return 1
  }
  if (n === 1) {
    return x
  }

  // n = 2 * p + q
  const p = Math.floor(n / 2)
  const q = n % 2
  const a = myPow(x * x, p)
  const b = myPow(x, q)
  return a * b
}

/**
 * 二分
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
let myPow2 = function (x, n) {
  if (n === 0) {
    return 1
  }

  if (n < 0) {
    return 1 / myPow(x, -n)
  }

  const p = Math.floor(n / 2)
  if (n % 2 === 0) {
    return myPow(x * x, p)
  }

  return myPow(x * x, p) * x
}
