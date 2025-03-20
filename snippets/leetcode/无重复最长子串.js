/**
 * tag: 简单
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长 子串 的长度。
 */

/**
 *
 * @param {string} s
 * @return {number}
 */
let lengthOfLongestSubstring = function (s) {
  if (s.length <= 1) {
    return s.length
  }

  let res = 0
  for (let i = 0, j = 1; j < s.length; j++) {
    while (s.slice(i, j).includes(s[j])) {
      i++
    }
    res = Math.max(res, j - i + 1)
  }

  return res
}
