/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
let myPow = function (x, n) {
  if (n === 0) {
    return 1
  }
  if (n === 1) {
    return x
  }
  if (n === -1) {
    return 1 / x
  }

  // n = 2 * p + q
  const p = Math.floor(n / 2)
  const q = n % 2
  const a = myPow(x, p)
  const b = myPow(x, q)
  return a * a * b
}
