/**
 * tag: 中等
 * https://leetcode.cn/problems/minimum-size-subarray-sum/description/
 * 不定长滑窗
 */

/**
 * 不定长滑窗
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
let minSubArrayLen = function (target, nums) {
  let minLen = Infinity
  let sum = 0

  for (let l = 0, r = 0; l < nums.length; l++) {
    while (sum < target && r < nums.length) {
      sum += nums[r]
      r++
    }

    if (sum >= target) {
      // 这里的边界实际上是 r - 1
      minLen = Math.min(minLen, r - l)
    }

    sum -= nums[l]
  }

  return minLen === Infinity ? 0 : minLen
}

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]))
console.log(minSubArrayLen(11, [1, 2, 3, 4, 5]))
