/**
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
 * @param {number[]} nums
 */
let longestConsecutive = function (nums) {
  if (!nums) {
    return 0
  }

  if (nums.length <= 1) {
    return nums.length
  }

  // 通过信标一个个找
  nums = Array.from(new Set(nums)).sort((a, b) => a - b)
  let longest = 1
  for (let pivot = 0; pivot < nums.length; pivot++) {
    let val = nums[pivot]
    let idx = pivot + 1
    while (nums[idx] === val + 1) {
      val = nums[idx]
      idx += 1
    }
    const len = idx - pivot
    longest = Math.max(longest, len)
    if (longest + pivot >= nums.length) {
      break
    }
  }

  return longest
}

console.log(longestConsecutive([100, 4, 200, 1, 3, 2]))
console.log(
  longestConsecutive([100, 4, 200, 1, 1, 3, 2, 5, 6, 8, 9, 9, 10, 11, 12, 13, 14, 15, 16, 17]),
)
