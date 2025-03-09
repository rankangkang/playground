/**
 * tag: 中等
 * 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
 * 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。
 * 例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
let lengthOfLIS = function (nums) {
  // 动态规划，dp[i] 代表 位置 i 为结尾的最长子序列，现在需要求出这个 dp
  const dp = new Array(nums.length).fill(1)

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      // nums[i] > nums[j] 代表 位置 i 可接在 j 后成为子序列的一部分
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[j] + 1, dp[i])
      }
    }
  }

  return Math.max(...dp)
}
