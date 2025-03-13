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

console.log(searchInsert([1, 3, 5, 6], 2))

// 迭代的方式，标准二分查找
function searchInsertIterate(nums, target) {
  let l = 0
  let r = nums.length - 1
  while (l <= r) {
    const mid = Math.floor((l + r) / 2)
    const midNum = nums[mid]
    if (midNum === target) {
      return mid
    }

    if (midNum > target) {
      // 在左边
      r = mid - 1
    } else {
      l = mid + 1
    }
  }

  // 为什么是 l？针对 l === r 时进行讨论
  return l
}

console.log(searchInsertIterate([1, 3, 5, 6], 2))
