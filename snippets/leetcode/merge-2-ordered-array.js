/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 * @description 解题思路：将该题转为直接合并两个有序数组，返回新的数组，复杂度降低很多
 */
var merge = function(nums1, m, nums2, n) {
  // 复制 nums1 到 temp1
  const temp1 = nums1.slice(0, m);
  // 清空数组
  nums1.splice(0, m + n)

  let i = 0, j = 0;
  let sorted = 0;
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
};