/**
 * tag: 中等
 * 给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数 。
 * 子数组是数组中元素的连续非空序列。
 */

/**
 * 暴力解法，确定一个边界后，向另外一个边界枚举
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
let subarraySum = function (nums, k) {
  let count = 0
  let len = nums.length

  for (let left = 0; left < len; left++) {
    let sum = 0
    for (let right = left; right < len; right++) {
      sum += nums[right]
      // // 不能全部保证数组元素为正，所以下面的判断要注释
      // if (sum > k) {
      //   break;
      // }
      if (sum === k) {
        count++
      }
    }
  }

  return count
}
