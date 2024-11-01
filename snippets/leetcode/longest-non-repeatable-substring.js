/**
 * 最长的不重复子串
 * 暴力解法
 * @param {string} s
 */
function solution(s) {
  let max = ''
  for (let i = 0; i < s.length - 1; i++) {
    for (let j = i + 1; j < s.length; j++) {
      const str = s.substring(i, j)
      if (str.length > max.length && !isRepeatable(str)) {
        max = str
      }
    }
  }

  return max

  /**
   * 是否重复
   * @param {string} s
   */
  function isRepeatable(s) {
    const chs = s.split('')
    const set = new Set(chs)
    if (set.size === s.length) {
      return false
    }

    return true
  }
}

console.log(solution('abcabcbb'))
console.log(solution('bbbbb'))

/**
 * 解法二
 * @param {string} s
 */
function solution2(s) {
  let max = ''

  let right = 0
  let set = []

  while (right < s.length) {
    const ch = s.charAt(right)
    if (set.includes(ch)) {
      const idx = set.indexOf(ch)
      // 出现重复，就移除重复前的子串
      set = set.slice(idx + 1) // 效果等同于 set.splice(0, idx + 1)
      set.push(ch)
    } else {
      set.push(ch)
    }

    if (set.length > max.length) {
      max = set.join('')
    }

    right++
  }

  return max
}

console.log(solution2('abcabcbb'))
console.log(solution2('bbbbb'))
