/**
 * https://leetcode.cn/problems/next-greater-element-i/description/
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
let nextGreaterElement = function (nums1, nums2) {
  const nextGreaterNums2 = findNextGreaterElement(nums2)
  return nums1.map((item) => {
    const index = nums2.indexOf(item)
    return nextGreaterNums2[index]
  })
}

/**
 * 单调栈，栈顶到栈底单调递减，栈顶遇到比它大的就出栈，并记录答案
 * @param {number[]} nums
 * @returns {number[]}
 */
function findNextGreaterElement(nums) {
  const stack = []
  const res = new Array(nums.length).fill(-1)
  const len = nums.length
  for (let i = 0; i < len; i++) {
    const n = nums[i]
    while (stack.length && nums[stack.at(-1)] <= n) {
      const idx = stack.pop()
      res[idx] = n
    }

    stack.push(i)
  }

  return res
}

console.log(nextGreaterElement([4, 1, 2], [1, 3, 4, 2]))
