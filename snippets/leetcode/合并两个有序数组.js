/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 * @description 解题思路：将该题转为直接合并两个有序数组，返回新的数组，复杂度降低很多
 */
let merge = function (nums1, m, nums2, n) {
  // 复制 nums1 到 temp1
  const temp1 = nums1.slice(0, m)
  // 清空数组
  nums1.splice(0, m + n)

  let i = 0
  let j = 0
  let sorted = 0
  // temp1 与 nums2 合并到 nums1
  while (i < m && j < n) {
    if (temp1[i] <= nums2[j]) {
      nums1[sorted] = temp1[i]
      sorted++
      i++
    } else {
      nums1[sorted] = nums2[j]
      sorted++
      j++
    }
  }

  if (i < m) {
    nums1.push(...temp1.slice(i))
  } else if (j < n) {
    nums1.push(...nums2.slice(j))
  }
}

/**
 * 优化版本，在 nums1 原地操作
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 * @description
 */
let merge2 = function (nums1, m, nums2, n) {
  // 移除尾部多余的 0
  nums1.splice(m, n)
  let i = 0
  let j = 0
  while (i < m + n && j < n) {
    if (nums1[i] > nums2[j]) {
      // 把 j 放入结果
      nums1.splice(i, 0, nums2[j])
      i++ // 将 i 指向原来的位置
      j++ // 将 j 指向下一个
    } else {
      // 将 i 放入结果，这里就在原地，不需要操作
      i++ // 将 i 指向下一个
    }
  }

  if (j < n) {
    // nums2 尚未完全放入结果，放入即可
    nums1.push(...nums2.slice(j))
  }

  // nums1 就在原地，故不需要其他操作

  return nums1
}

console.log(merge2([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3))
