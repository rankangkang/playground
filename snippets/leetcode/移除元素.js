/**
 * tag: 简单
 * https://leetcode.cn/problems/remove-element/
 */

/**
 * 删除
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
let removeElement = function (nums, val) {
  let currentIndex = 0
  let res = 0
  while (currentIndex < nums.length) {
    if (nums[currentIndex] === val) {
      nums.splice(currentIndex, 1)
      continue
    }
    currentIndex++
    res++
  }
  return res
}

/**
 * 双指针，将 val 交换到数组尾部，不需要删除
 * @param {number[]} nums
 * @param {number} val
 * @returns
 */
function removeElement2(nums, val) {
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    if (nums[left] === val) {
      ;[nums[left], nums[right]] = [nums[right], nums[left]]
      right--
      continue
    } else {
      left++
    }
  }

  return left
}

console.log(removeElement2([3, 2, 2, 3], 3))
