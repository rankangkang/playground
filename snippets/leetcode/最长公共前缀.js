/**
 * 最长公共前缀
 * @param {string[]} arr
 * @returns {string}
 */
function solution(arr) {
  const minLen = arr.reduce((len, item) => {
    if (len > item.length) {
      len = item.length
    }
    return len
  }, Infinity)

  let i = 0

  while (i < minLen) {
    const ch = arr[0].charAt(i)
    const isSame = arr.every((s) => s.charAt(i) === ch)
    if (!isSame) {
      break
    }
    i++
  }

  return arr[0].substring(0, i)
}

console.log(solution(['flower', 'flow', 'flight']))
console.log(solution(['dog', 'racecar', 'car']))
