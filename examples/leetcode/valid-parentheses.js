/**
 * 有效括号是否匹配，括号可以互相包含，但不能参差摆放
 * 字符串仅包含括号：'('，')'，'{'，'}'，'['，']'
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const queue = []
  const leftBrackets = '({['
  const matchMap = {
    '(': ')',
    '{': '}',
    '[': ']'
  }
  for (let subS of s) {
    if (leftBrackets.includes(subS)) {
      queue.push(subS)
    } else {
      const leftBracket = queue.pop()
      if (subS !== matchMap[leftBracket]) {
        return false
      }
    }
  }

  if (queue.length !== 0) {
    return false
  }

  return true
};