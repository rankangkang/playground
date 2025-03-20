/**
 * tag: 中等
 * https://leetcode.cn/problems/shortest-unsorted-continuous-subarray/
 */

/**
 * 排序后进行比表，找到无序区的左右边界
 * @param {number[]} nums
 * @return {number}
 */
let findUnsortedSubarray = function (nums) {
  const sorted = [...nums].sort((a, b) => a - b)
  let l = 0
  let r = nums.length - 1
  while (l < nums.length && nums[l] === sorted[l]) {
    l++
  }
  while (l < r && nums[r] === sorted[r]) {
    r--
  }

  return r - l + 1
}
