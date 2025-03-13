/**
 * tag: 中等
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 子数组是数组中的一个连续部分。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
let maxSubArraySum = function (nums) {
  let max = Number.NEGATIVE_INFINITY
  let pre = 0
  let len = nums.length
  for (const x of nums) {
    // 当前和
    const curr = pre + x
    // 这一步信息量较大：pre + x 为当前和， pre 为之前和
    // 若当前和小于当前值x，说明之前和为负，可直接丢弃；将当前值x设置为当前和，新序列从此处开始
    pre = Math.max(curr, x)
    max = Math.max(max, pre)
  }

  return max
}

console.log(maxSubArraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
