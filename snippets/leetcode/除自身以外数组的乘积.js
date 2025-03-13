/**
 * 给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
 * 题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。
 * 请 不要使用除法，且在 O(n) 时间复杂度内完成此题
 */

/**
 * 使用 前缀积 与 后缀积 的方式求解。先分别计算数组每个位置之前与之后所有元素的乘积，得到前缀积与后缀积，然后使用前缀积与后缀积对应位置的结果相乘即可
 * @param {number[]} nums
 * @return {number[]}
 */
let productExceptSelf = function (nums) {
  // 前缀集与后缀级
  const leftSet = []
  const rightSet = []
  const size = nums.length

  // 取得前缀积
  leftSet[0] = 1
  for (let i = 1; i < size; i++) {
    leftSet[i] = leftSet[i - 1] * nums[i - 1]
  }

  // 取得后缀即
  rightSet[size - 1] = 1
  for (let i = size - 2; i >= 0; i--) {
    rightSet[i] = nums[i + 1] * rightSet[i + 1]
  }

  // 计算结果
  const res = []
  for (let i = 0; i < size; i++) {
    res[i] = leftSet[i] * rightSet[i]
  }

  return res
}
