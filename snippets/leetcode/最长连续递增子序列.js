/**
 * tag: 简单
 * 给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。
 * 连续递增的子序列 可以由两个下标 l 和 r（l < r）确定，如果对于每个 l <= i < r，都有 nums[i] < nums[i + 1] ，那么子序列 [nums[l], nums[l + 1], ..., nums[r - 1], nums[r]] 就是连续递增子序列。
 */

/**
 * 可以使用动态规划，明确 dp[i] 代表位置 i 结尾的最长连续递增子序列
 * @param {number[]} nums
 * @return {number}
 */
let findLengthOfLCIS = function (nums) {
  const dp = new Array(nums.length).fill(1)

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      dp[i] = Math.max(dp[i], dp[i - 1] + 1)
    }
  }

  return Math.max(...dp)
}
