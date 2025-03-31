/**
 * 二分查找
 * @param {number} x
 * @return {number}
 */
let mySqrt = function (x) {
  let left = 0
  let right = x
  let res = -1
  while (left <= right) {
    const mid = (left + right) >> 1
    const pow2 = mid * mid
    if (pow2 <= x) {
      // 结果只在比它小的区间，所以在这里记录一下结果
      res = mid
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return res
}

console.log(mySqrt(2))
console.log(mySqrt(3))
console.log(mySqrt(4))
console.log(mySqrt(5))
console.log(mySqrt(6))
console.log(mySqrt(7))
console.log(mySqrt(8))
console.log(mySqrt(9))
