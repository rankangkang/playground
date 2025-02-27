/**
 * tag: 困难
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 */

/**
 * 首先扫描数组，记录位置左边和右边的最大高度，和前缀积的思路有点像
 * @param {number[]} heights
 * @return {number}
 */
var trap = function (heights) {
  const len = heights.length;
  const rightMax = []
  const leftMax = []

  leftMax[0] = heights[0]
  for (let i = 1; i < len; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], heights[i])
  }

  rightMax[len - 1] = heights[len - 1]
  for (let i = len - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], heights[i])
  }

  let r = 0
  for (let i = 0; i < len - 1; i++) {
    const left = leftMax[i];
    const right = rightMax[i]
    const bottom = heights[i];
    r += Math.max(0, (Math.min(left, right) - bottom) * 1)
  }

  return r;
};