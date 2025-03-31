/**
 * tag: 简单
 * https://leetcode.cn/problems/valid-anagram/description/
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
let isAnagram = function (s, t) {
  const map = new Map()
  for (const ch of s) {
    let count = map.get(ch) || 0
    map.set(ch, count + 1)
  }

  for (const ch of t) {
    if (!map.has(ch)) {
      return false
    }

    const count = map.get(ch)
    if (count <= 0) {
      return false
    }

    map.set(ch, count - 1)
  }

  for (const [, value] of map) {
    if (value !== 0) {
      return false
    }
  }

  return true
}

console.log(isAnagram('anagram', 'nagaram'))
console.log(isAnagram('anagramm', 'nagaram'))
