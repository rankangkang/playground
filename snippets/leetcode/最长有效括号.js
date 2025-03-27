/**
 * 依赖栈，匹配成功后，将原有位置设置为 1，后续连续出现的1 的个数就是最长有效括号
 * @param {string} s
 * @return {number}
 */
let longestValidParentheses = function (s) {
  // 存储左括号下标
  const stack = []
  const temp = new Array(s.length).fill(0)
  for (let i = 0; i < s.length; i++) {
    const char = s.charAt(i)
    if (char === '(') {
      stack.push(i)
    } else {
      if (stack.length) {
        const left = stack.pop()
        temp[left] = temp[i] = 1
      }
    }
  }

  let max = 0
  let curr = 0
  for (let i = 0; i < temp.length; i++) {
    if (temp[i]) {
      curr += 1
      max = Math.max(curr, max)
    } else {
      curr = 0
    }
  }
  return max
}

console.log(longestValidParentheses('()(()'))
