/**
 * 滑动窗口
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
let getAverages = function (nums, k) {
  const window = 2 * k + 1
  const res = new Array(nums.length).fill(-1)
  let sum = 0
  for (let i = 0; i < nums.length; i++) {
    if (i < window) {
      sum += nums[i]
      if (i === window - 1) {
        const index = Math.floor((i + i - window + 1) / 2)
        res[index] = Math.floor(sum / window)
      }
      continue
    }

    const nextSum = sum + nums[i] - nums[i - window]
    const index = Math.floor((i + i - window + 1) / 2)
    res[index] = Math.floor(nextSum / window)
    sum = nextSum
  }

  return res
}
