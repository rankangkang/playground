/**
 * tag: 中等
 * https://leetcode.cn/problems/next-greater-element-ii/description/
 * 同样是单调栈的思路，但是因为是循环数组，所以把数组循环两次就行了（遍历 2 * nums.length 次）
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
let nextGreaterElements = function (nums) {
  const stack = []
  const res = new Array(nums.length).fill(-1)
  const len = nums.length
  const len2 = len * 2
  for (let i = 0; i < len2; i++) {
    const modi = i % len
    const n = nums[modi]
    while (stack.length && nums[stack.at(-1)] < n) {
      const idx = stack.pop()
      res[idx] = n
    }

    stack.push(modi)
  }

  return res
}
