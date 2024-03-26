/**
 * 最小覆盖子串，双指针+滑动窗口
 * 右指针首先向右移动，直到包含所有子串字符
 * 此时左指针可开始向右移动，每移动一步变判断是否满足，满足时记录最短子串；不满足时右指针再次向右移动
 * @param {string} s
 * @param {string} t
 * @returns {string}
 */
function solution(s, t) {
  const map = {}
  for (const ch of t) {
    map[ch] = (map[ch] || 0) + 1
  }

  let typeCount = Object.keys(map).length

  let result = ''
  let minLen = Infinity
  let left = 0, right = 0
  while(right < s.length) {
    const rch = s[right]
    if (rch in map) { // 有指针找到一个目标字符
      map[rch]--
      if (map[rch] === 0) {
        // 目标字符数量为0，说明该字符已经被全部找到，不再需要这种类型字符
        typeCount--
      }
    }
    right++

    while(typeCount === 0) {
      if (right - left < minLen) {
        minLen = right - left
        result = s.substring(left, right)
      }

      const lch = s[left]
      if (lch in map) {
        map[lch]++ // 左指针找到目标字符，但是因为窗口缩小，即将丢失目标字符，故加1
        if (map[lch] > 0) {
          typeCount++
        }
      }
      left++
    }
  }

  return result
}

console.log(solution("ADOBECODEBANC", 'ABC'))