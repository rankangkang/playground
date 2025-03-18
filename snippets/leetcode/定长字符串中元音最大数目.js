/**
 * 滑动窗口
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
let maxVowels = function (s, k) {
  let max = 0
  let prev = 0
  const charSets = new Set(['a', 'e', 'i', 'o', 'u'])
  for (let i = 0; i <= s.length - k; i++) {
    let current = prev
    if (i === 0) {
      for (let j = 0; j < k; j++) {
        if (charSets.has(s[j])) {
          current++
        }
      }
    } else {
      const prevCh = s[i - 1]
      const rightCh = s[i + k - 1]
      if (charSets.has(prevCh) && !charSets.has(rightCh)) {
        // 前一个是，后一个不是, current = prev - 1
        current = prev - 1
      } else if (!charSets.has(prevCh) && charSets.has(rightCh)) {
        // 前一个不是，后一个是，current prev + 1
        current = prev + 1
      }
    }

    max = Math.max(max, current)
    prev = current
  }

  return max
}

console.log(maxVowels('weallloveyou', 7))
