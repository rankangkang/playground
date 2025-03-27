/**
 * @param {string} s
 * @param {number} maxLetters
 * @param {number} minSize
 * @param {number} maxSize
 * @return {number}
 */
let maxFreq = function (s, maxLetters, minSize, maxSize) {
  const map = new Map()
  for (let i = 0; i < s.length; i++) {
    let temp = ''
    const set = new Set()
    for (let j = i; j < s.length; j++) {
      const char = s[j]
      set.add(char)
      temp += char

      if (temp.length < minSize) {
        continue
      }

      if (temp.length > maxSize || set.size > maxLetters) {
        break
      }

      if (set.size <= maxLetters) {
        const count = map.get(temp) || 0
        map.set(temp, count + 1)
      }
    }
  }

  let max = 0
  map.forEach((count) => {
    max = Math.max(count, max)
  })

  return max
}

console.log(maxFreq('aababcaab', 2, 3, 4))
