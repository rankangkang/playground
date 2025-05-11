let run = 0

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
let fourSum = function (nums, target) {
  nums = nums.sort((a, b) => a - b)

  const binaryFind = (target, start, end = nums.length - 1) => {
    while (start <= end) {
      const mid = (start + end) >> 1
      if (nums[mid] > target) {
        end = mid - 1
      } else if (nums[mid] < target) {
        start = mid + 1
      } else {
        return mid
      }
    }
    return -1
  }

  /**
   *
   * @param {number} start
   * @param {number} target
   * @param {number} count
   */
  const find = (start, target, count = 1) => {
    if (count <= 0) {
      return []
    }

    if (count === 1) {
      if (binaryFind(target, start) >= 0) {
        return [[target]]
      }
      return []
    }

    if (start + count > nums.length) {
      return []
    }

    let res = []
    for (let i = start; i < nums.length; i++) {
      const item = nums[i]
      if (i > start && item === nums[i - 1]) {
        continue
      }
      const nextTarget = target - item
      const temp = find(i + 1, nextTarget, count - 1)
      if (temp.length > 0) {
        res.push(...temp.map((t) => [item, ...t]))
      }
    }
    return res
  }

  return find(0, target, 4)
}
