/**
 * tag: 简单
 * https://leetcode.cn/problems/assign-cookies/
 */

/**
 * 排序后进行比较，大对大一定是最多的
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
let findContentChildren = function (g, s) {
  g.sort((a, b) => b - a)
  s.sort((a, b) => b - a)

  let res = 0
  let i = 0
  let j = 0
  for (; i < g.length && j < s.length; ) {
    if (s[j] >= g[i]) {
      res += 1
      i++
      j++
    } else {
      // 第 i 个无法满足，向右移动 i
      i++
    }
  }

  return res
}
