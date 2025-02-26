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

console.time('solution1')
console.log(solution('abcabcbb'))
console.log(solution('bbbbb'))
console.timeEnd('solution1')

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

console.time('solution2')
console.log(solution2('abcabcbb'))
console.log(solution2('bbbbb'))
console.timeEnd('solution2')

/**
 * 双指针，左右指针确定范围
 * 区间跟右指针后的第一位比较，若不包含，则右指针向右滑动（不重复子串长度+1），否则移动左指针，继续刚才的价差
 * @param {string} s 
 */
function solution3(s) {
  if (s.length <= 1) {
    return s.length;
  }

  let r = 0;
  // 转数组，方便使用
  const chars = s.split('');
  for (let i = 0, j = 1; j < s.length; j++) {
    while (chars.slice(i, j).includes(chars[j])) {
      i++;
    }
    r = Math.max(r, j - i + 1)
  }

  return r;
}

console.time('solution3')
console.log(solution3('abcabcbb'))
console.log(solution3('bbbbb'))
console.timeEnd('solution3')
