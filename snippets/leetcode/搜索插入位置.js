/**
 * @param {number[]} nums 已排序的数组
 * @param {number} target
 * @return {number}
 */
let searchInsert = function (nums, target) {
  // 递归二分查找
  function doSearch(start, end) {
    if (start > end) {
      return start
    }

    const mid = Math.floor((start + end) / 2)
    const midNum = nums[mid]
    if (midNum === target) {
      return mid
    } else if (midNum > target) {
      // target 在左边
      return doSearch(start, mid - 1)
    } else {
      // target 在右边
      return doSearch(mid + 1, end)
    }
  }

  return doSearch(0, nums.length - 1)
}

console.log(searchInsert([1, 3, 5, 6], 5))

// 迭代的方式，标准二分查找
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
let searchInsert2 = function (nums, target) {
  let l = 0
  let r = nums.length - 1
  while (l <= r) {
    const mid = (l + r) >> 1
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] > target) {
      r = mid - 1
    } else {
      l = mid + 1
    }
  }

  return l
}

console.log(searchInsert2([1, 3, 5, 6], 7))
