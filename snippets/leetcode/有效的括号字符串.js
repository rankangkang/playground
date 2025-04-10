/**
 * @param {string} s
 * @return {boolean}
 */
let checkValidString = function (s) {
  const bracketStack = []
  const markStack = []
  for (let i = 0; i < s.length; i++) {
    const char = s.charAt(i)
    if (char === '(') {
      bracketStack.push(i)
    } else if (char === '*') {
      markStack.push(i)
    } else {
      // 右括号，进行匹配
      if (bracketStack.length) {
        bracketStack.pop()
      } else if (markStack.length) {
        markStack.pop()
      } else {
        return false
      }
    }
  }

  // 对剩下的括号与星号进行匹配，若星号在左括号前面，则不可能匹配成功
  while (bracketStack.length && markStack.length) {
    const leftIndex = bracketStack.pop()
    const markIndex = markStack.pop()
    if (leftIndex > markIndex) {
      return false
    }
  }

  return bracketStack.length === 0
}
