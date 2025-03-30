/**
 * @param {number[]} nums
 * @param {number} k 第 k 大，即从小到大排列的 nums.length - k 下标处的数
 * @return {number}
 */
let findKthLargest = function (nums, k) {
  return quickSelect(nums, 0, nums.length - 1, nums.length - k)
}

// 快速选择，选到下标为 K 元素就返回
function quickSelect(nums, left, right, kth) {
  const index = partition(nums, left, right)
  if (index === kth) {
    return nums[kth]
  }
  if (kth < index) {
    return quickSelect(nums, left, index - 1, kth)
  }
  return quickSelect(nums, index + 1, right, kth)
}

function partition(nums, left, right) {
  const swap = (i, j) => {
    ;[nums[i], nums[j]] = [nums[j], nums[i]]
  }
  let i = left - 1
  let j = left
  let pivot = nums[right]
  for (; j < right; j++) {
    if (nums[j] < pivot) {
      i++
      swap(i, j)
    }
  }

  swap(i + 1, right)
  return i + 1
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2))
