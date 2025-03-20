/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
let gcdOfStrings = function (str1, str2) {
  // 左闭右闭
  let end = -1
  const len = Math.min(str1.length, str2.length)
  const maxLen = Math.max(str1.length, str2.length)
  const check = (len) => {
    const snippet = str1.slice(0, len + 1)
    let ok1 = false
    let ok2 = false
    let temp = ''
    while (temp.length <= maxLen) {
      temp += snippet
      if (temp.length === str1.length) {
        if (temp === str1) {
          ok1 = true
        } else {
          break
        }
      }

      if (temp.length === str2.length) {
        if (temp === str2) {
          ok2 = true
        } else {
          break
        }
      }
    }

    return ok1 && ok2
  }

  let i = 0
  while (i < len) {
    if (check(i)) {
      end = i
    }
    i++
  }

  return str1.slice(0, end + 1)
}

console.log(gcdOfStrings('A', 'AA'))
