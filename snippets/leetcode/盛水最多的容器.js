/**
 * tag: 中等
 * 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 * 返回容器可以储存的最大水量。
 * 说明：你不能倾斜容器。
 */

/**
 * 使用双指针，遇到短板则向中间移动，记录最大值。
 * 一句话概括：我们left++和right--都是为了尝试取到更多的水，如果短的板不动的话，取到的水永远不会比上次多。
 * @param {number[]} nums
 */
let maxArea = function (nums) {
  let left = 0
  let right = nums.length - 1
  let max = 0
  while (left < right) {
    const width = right - left
    const height = Math.min(nums[left], nums[right])
    const area = width * height
    max = Math.max(max, area)

    // 左边是短板
    if (nums[left] === height) {
      left++
    } else {
      // 右边是短板
      right--
    }
  }

  return max
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))
