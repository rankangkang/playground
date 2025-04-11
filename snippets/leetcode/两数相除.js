/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
let divide = function (a, b) {
  const isNegative = !!((a > 0) ^ (b > 0))
  a = Math.abs(a)
  b = Math.abs(b)
  let count = 0
  while (a >= b) {
    a -= b
    count += 1
  }

  return isNegative ? -count : count
}

console.log(divide(15, -2))
