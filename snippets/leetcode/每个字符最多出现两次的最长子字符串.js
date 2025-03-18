/**
 * @param {string} s
 * @return {number}
 */
let maximumLengthSubstring = function (s, k = 2) {
  let map = new Map()
  let max = 0

  let i = (j = 0)
  // 左右滑动窗口
  for (; i < s.length && j < s.length; ) {
    while (j < s.length && (map.get(s[j]) || 0) < k) {
      map.set(s[j], (map.get(s[j]) || 0) + 1)
      j++
    }

    // 记录结果
    max = Math.max(max, j - i)
    // 清除移出窗口的记录
    map.set(s[i], map.get(s[i]) - 1)
    i++
  }

  return max
}
