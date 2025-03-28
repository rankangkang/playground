/**
 * tag: 简单
 * https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/description/
 */
/**
 * 暴力解法
 * @param {string} s
 * @return {string}
 */
let removeDuplicates = function (s) {
  let arr = s.split('')

  const check = () => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        return i
      }
    }
    return -1
  }

  let nextIndex = check()
  while (nextIndex > -1) {
    arr.splice(nextIndex, 2)
    nextIndex = check()
  }

  return arr.join('')
}

console.log(removeDuplicates('abbaca'))

/**
 * 栈优化，遇到相同的就出栈
 * @param {string} s
 * @return {string}
 */
let removeDuplicates2 = function (s) {
  const stack = []
  for (let i = 0; i < s.length; i++) {
    const char = s.charAt(i)
    if (stack.length && stack.at(-1) === char) {
      stack.pop()
    } else {
      stack.push(char)
    }
  }

  return stack.join('')
}
