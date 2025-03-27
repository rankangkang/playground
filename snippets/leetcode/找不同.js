/**
 * tag: 简单
 * https://leetcode.cn/problems/find-the-difference/
 */
/**
 * 哈希法
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
let findTheDifference = function (s, t) {
  const map = new Map()
  for (let i = 0; i < s.length; i++) {
    const char = s[i]
    const count = map.get(char) || 0
    map.set(char, count + 1)
  }

  for (let i = 0; i < t.length; i++) {
    const char = t[i]
    const count = map.get(char)
    if (!count) {
      return char
    } else {
      map.set(char, count - 1)
    }
  }
}
