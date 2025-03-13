/**
 * tag: 中等
 * 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。
 * 返回这三个数的和。假定每组输入只存在恰好一个解。
 */

/**
 * 基于排序 + 双指针来做
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
let threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b)
  let diff = Infinity
  let res = 0
  for (let i = 0; i < nums.length; i++) {
    let l = i + 1
    let r = nums.length - 1
    while (l < r) {
      const val = nums[i] + nums[l] + nums[r]
      const absDiff = Math.abs(target - val)
      if (absDiff < diff) {
        diff = absDiff
        res = val
      }

      if (val === target) {
        return target
      } else if (val < target) {
        l++
      } else {
        r--
      }
    }
  }

  return res
}
