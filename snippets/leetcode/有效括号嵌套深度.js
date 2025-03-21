/**
 * tag: 中等
 * 用栈，避免括号嵌套
 * https://leetcode.cn/problems/maximum-nesting-depth-of-two-valid-parentheses-strings/description/
 */
/**
 * @param {string} seq
 * @return {number[]}
 */
let maxDepthAfterSplit = function (seq) {
  // let max = 0
  const r = []
  const stack = []
  for (let i = 0; i < seq.length; i++) {
    const char = seq.charAt(i)
    if (char === '(') {
      r[i] = stack.length % 2
      stack.push(char)
      // max = Math.max(max, stack.length)
    } else if (char === ')') {
      stack.pop()
      r[i] = stack.length % 2
    }
  }

  // return max
  return r
}
