/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
let minSum = function (nums1, nums2) {
  /**
   * @param {number[]} items
   */
  const traversal = (items) => {
    return items.reduce(
      (r, item) => {
        if (item === 0) {
          r.zero += 1
        }
        r.sum += item
        return r
      },
      { sum: 0, zero: 0 },
    )
  }

  const { sum: sum1, zero: zero1 } = traversal(nums1)
  const { sum: sum2, zero: zero2 } = traversal(nums2)

  // 两个数组所能达到的最小值，0 要替换为最小数，所以出现 0 最小和就加 1
  const minSum1 = sum1 + zero1
  const minSum2 = sum2 + zero2
  if ((zero1 === 0 && minSum2 > minSum1) || (zero2 === 0 && minSum1 > minSum2)) {
    return -1
  }

  return Math.max(minSum1, minSum2)
}
