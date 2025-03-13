/**
 * tag: 简单
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * 请注意 ，必须在不复制数组的情况下原地对数组进行操作。
 */

/**
 * 遇到 0 就删除并在末尾追加一个 0
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
let moveZeroes = function (nums) {
  let index = 0
  let len = nums.length
  let count = 0
  while (index < len - count) {
    if (!nums[index]) {
      nums.splice(index, 1)
      nums.push(0)
      count++
    } else {
      index++
    }
  }
}
