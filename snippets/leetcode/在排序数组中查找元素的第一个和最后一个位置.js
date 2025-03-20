/**
 * tag: 中等
 * https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
let searchRange = function (nums, target) {
  if (target < nums[0] || target > nums.at(-1)) {
    return [-1, -1]
  }

  // 二分查找目标
  const index = binarySearch(nums, target)
  if (index < 0) {
    return [-1, -1]
  }

  // 向两边扩张
  let left = (right = index)
  while (left >= 0 && nums[left] === target) {
    left--
  }
  while (right <= nums.length && nums[right] === target) {
    right++
  }

  return [left + 1, right - 1]
}

function binarySearch(nums, target) {
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (nums[mid] > target) {
      right = mid - 1
    } else if (nums[mid] < target) {
      left = mid + 1
    } else {
      return mid
    }
  }

  return -1
}
