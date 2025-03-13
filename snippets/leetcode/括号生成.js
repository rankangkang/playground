/**
 * @param {number} n
 * @return {string[]}
 */
let generateParenthesis = function (n) {
  let res = new Set()

  generate('', n, n)

  return Array.from(res)

  // 找规律，对生成的括号的每一个字符来看，前面的左括号都大于或等于右括号的数量，相反的方面来说，生成时剩余的左括号数量小于等于右括号数量
  function generate(str, left, right) {
    if (left === 0 && right === 0) {
      res.add(str)
      return
    }

    if (left === right) {
      // 剩余左右括号相等，下一个只能先用左括号
      generate(str + '(', left - 1, right)
    } else if (left < right) {
      if (left > 0) {
        // 左括号还剩余，左右都能用
        generate(str + '(', left - 1, right)
      }

      // 右括号还剩余，用右括号
      generate(str + ')', left, right - 1)
    }
  }
}
