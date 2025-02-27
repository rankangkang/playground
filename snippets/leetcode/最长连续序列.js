/**
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
 * 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
 */

/**
 * 采用哈希集合（在 JS 中是 Set），遍历该哈希集合，分别从该元素开始寻找连续序列，记录最长的长度
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
  let res = 0
  const set = new Set(nums);
  for (const target of set) {
    if (set.has(target - 1)) {
      // target - 1 存在，则从 target - 1 开始的会更长
      continue;
    }

    // 查询 target 开始的连续序列
    let end = target + 1;
    while (set.has(end)) {
      end += 1;
    }

    res = Math.max(res, end - target)
  }

  return res;
};