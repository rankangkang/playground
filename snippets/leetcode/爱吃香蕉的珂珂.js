/**
 * tag: 中等
 * https://leetcode.cn/problems/koko-eating-bananas/
 * 二分查找
 */
/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
let minEatingSpeed = function (piles, h) {
  // 左边界，此时一定不可行
  let left = 0
  // 右边界，一小时必定吃完一堆
  let right = Math.max(...piles)

  /**
   * 计算以 speed 吃完所有香蕉所需时间
   * @param {number} speed
   * @returns
   */
  const getTime = (speed) => {
    let time = 0
    for (const p of piles) {
      time += Math.ceil(p / speed)
    }
    return time
  }

  while (left < right) {
    const mid = (left + right) >> 1
    const time = getTime(mid)
    if (time <= h) {
      right = mid
    } else {
      left = mid + 1
    }
  }

  return right
}

console.log(minEatingSpeed([3, 6, 7, 11], 8))
