/**
 * tag: 简单
 * 给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
 * 你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。
 */

/**
 * 使用 hash 集合，当第一次遇到时加入，第二次遇到时删除，最后剩下的就是结果
 * @param {number[]} nums
 * @return {number}
 */
let singleNumber = function (nums) {
  const set = new Set()
  for (const x of nums) {
    if (!set.has(x)) {
      set.add(x)
    } else {
      set.delete(x)
    }
  }

  const first = set.values().next().value
  return first
}
