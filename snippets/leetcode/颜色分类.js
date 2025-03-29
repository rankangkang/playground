/**
 * tag: 中等
 * https://leetcode.cn/problems/sort-colors/description/
 */
/**
 * 三指针
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
let sortColors = function (nums) {
  const len = nums.length
  if (len < 2) {
    return
  }

  const swap = (i, j) => {
    ;[nums[i], nums[j]] = [nums[j], nums[i]]
  }
  let p0 = 0
  let p2 = len - 1
  let i = 0
  while (i <= p2) {
    if (nums[i] === 0) {
      // 与 p0 交换
      swap(i, p0)
      p0++
      i++
    } else if (nums[i] === 2) {
      // 与 p2 交换
      swap(i, p2)
      p2--
      // 这里 i 不增加，因为换过来的还需要检查
    } else {
      // 为 1
      i++
    }
  }
}

/**
 * 计数排序
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function sortColors2(nums) {
  const map = new Map()
  for (const n of nums) {
    const count = map.get(n) || 0
    map.set(n, count + 1)
  }

  let j = 0
  for (let i = 0; i <= 2; i++) {
    const count = map.get(i) || 0
    nums.fill(i, j, j + count)
    j += count
  }

  return nums
}

console.log(sortColors2([2, 0, 2, 1, 1, 0]))
