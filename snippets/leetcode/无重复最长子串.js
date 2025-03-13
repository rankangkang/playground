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

  let r = 0
  // 转数组，方便使用
  const chars = s.split('')
  for (let i = 0, j = 1; j < s.length; j++) {
    while (chars.slice(i, j).includes(chars[j])) {
      i++
    }
    r = Math.max(r, j - i + 1)
  }

  return r
}
