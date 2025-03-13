/**
 * 给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。
 * 判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false 。
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
let canJump = function (nums) {
  let highest = 0
  let destination = nums.length - 1
  for (let i = 0; i <= highest && highest < destination; i++) {
    // 跳最大的步数，如果这个点能跳到，那肯定能调到这个点左边的点
    highest = Math.max(i + nums[i], highest)
  }

  return highest >= destination
}
