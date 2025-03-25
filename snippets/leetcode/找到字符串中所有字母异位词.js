/**
 * 滑动窗口，若区间内各字符出现次数与目标词字符出现次数相同，则为字母异位词
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
let findAnagrams = function (s, p) {
  const slen = s.length
  const plen = p.length

  const getCharIndex = (char) => char.charCodeAt() - 'a'.charCodeAt()
  const pCount = new Array(26).fill(0)
  for (const char of p) {
    pCount[getCharIndex(char)]++
  }

  const sCount = new Array(26).fill(0)
  const compare = () => {
    for (let i = 0; i < 26; i++) {
      if (pCount[i] !== sCount[i]) {
        return false
      }
    }

    return true
  }

  const res = []
  for (let i = 0; i < slen; i++) {
    const char = s[i]
    sCount[getCharIndex(char)]++

    const left = i - plen + 1
    if (left < 0) {
      continue
    }

    if (compare()) {
      res.push(left)
    }

    // 右移，移除 left
    sCount[getCharIndex(s[left])]--
  }

  return res
}

console.log(findAnagrams('cbaebabacd', 'abc'))
