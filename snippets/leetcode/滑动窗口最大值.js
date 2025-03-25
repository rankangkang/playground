/**
 * 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
 * 返回 滑动窗口中的最大值 。
 */

/**
 * 单调队列解法，队头到队尾单调递减
 * 思路是 及时去掉无用数据，保证双端队列有序：
 * 1. 当前数字大于队尾数字时，弹出队尾元素，因为要保持单调性；
 * 2. 弹出不在窗口内的元素
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
let maxSlidingWindow = function (nums, k) {
  const res = []
  const indexQueue = []

  // 队头到队尾单调递减
  for (let i = 0; i < nums.length; i++) {
    while (indexQueue.length && nums[indexQueue[indexQueue.length - 1]] <= nums[i]) {
      indexQueue.pop()
    }
    // 放入下标，保持单调
    indexQueue.push(i)

    // 队头离开窗口，
    if (i - indexQueue[0] >= k) {
      indexQueue.shift()
    }

    // 由于队头到队尾单调递减，所以队头的最大值是队首
    if (i >= k - 1) {
      res.push(nums[indexQueue[0]])
    }
  }

  return res
}

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))
