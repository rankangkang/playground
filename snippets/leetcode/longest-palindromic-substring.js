/**
 * 最长回文子串
 * @param {string} s
 * @returns {string}
 */
function solution(s) {
  // 暴力解法，获取每一个子串组合，判断其是否为回文串
  let max = ''
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j <= s.length; j++) {
      const str = s.substring(i, j)
      if (max !== str && str.length > max.length && isPalidrome(str)) {
        max = str
      }
    }
  }

  return max

  /**
   * 判断是否为回文串
   * @param {string} s
   * @returns
   */
  function isPalidrome(s) {
    if (s.length === 1) {
      return true
    }

    // 两端向中间夹逼
    for (let i = 0, j = s.length - 1; i < j; ++i, --j) {
      if (s.charAt(i) !== s.charAt(j)) {
        return false
      }
    }

    return true
  }
}

console.log(solution('babad'))
console.log(solution('cpdd'))

/**
 * 最长回文子串
 * @param {string} s
 * @returns {string}
 */
function solution2(s) {
  if (s.length < 2) return s

  let start = 0 // 记录最长回文子串的起始位置
  let maxLength = 0 // 记录最长回文子串的长度

  for (let i = 0; i < s.length; i++) {
    // 以当前字符为中心，向两边扩展
    const len1 = expandAroundCenter(s, i, i)
    // 以当前字符和下一个字符之间的空隙为中心，向两边扩展
    const len2 = expandAroundCenter(s, i, i + 1)

    // 取两种扩展方式中的最大长度
    const len = Math.max(len1, len2)

    // 如果得到的回文子串比之前记录的更长，则更新最长回文子串的起始位置和长度
    if (len > maxLength) {
      maxLength = len
      start = i - Math.floor((len - 1) / 2)
    }
  }

  // 根据最长回文子串的起始位置和长度截取字符串并返回
  return s.substring(start, start + maxLength)

  function expandAroundCenter(s, left, right) {
    // 从给定的left和right位置向两边扩展，返回以当前位置为中心的回文子串的长度
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--
      right++
    }
    // 返回当前以left和right为中心的回文子串的长度
    return right - left - 1
  }
}

console.log(solution2('babad'))
console.log(solution2('cpdd'))
