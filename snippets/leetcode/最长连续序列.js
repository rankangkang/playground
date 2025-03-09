/**
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
 * 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
 */

/**
 * 采用哈希集合（在 JS 中是 Set），遍历该哈希集合，分别从该元素开始寻找连续序列，记录最长的长度
 * @param {number[]} nums
 * @return {number}
 */
let longestConsecutive = function (nums) {
  let res = 0
  const set = new Set(nums)
  for (const target of set) {
    if (set.has(target - 1)) {
      // target - 1 存在，则从 target - 1 开始的会更长
      continue
    }

    // 查询 target 开始的连续序列
    let end = target + 1
    while (set.has(end)) {
      end += 1
    }

    res = Math.max(res, end - target)
  }

  return res
}

/**
 * 暴力求解
 * @param {number[]} nums
 */
let longestConsecutive2 = function (nums) {
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
