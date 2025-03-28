/**
 * 求解逆波兰表达式，遇到运算符就出栈求和，然后将结果入栈
 * @param {string[]} tokens
 * @return {number}
 */
let evalRPN = function (tokens) {
  const stack = []
  const operators = new Set(['+', '-', '*', '/'])
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (operators.has(token)) {
      const b = stack.pop()
      const a = stack.pop()
      const temp = calc(a, b, token)
      stack.push(temp)
    } else {
      stack.push(token)
    }
  }

  return Number(stack[0])
}

/**
 *
 * @param {string} a
 * @param {string} b
 * @param {string} op
 */
function calc(a, b, op) {
  switch (op) {
    case '+':
      return Number(a) + Number(b)
    case '-':
      return Number(a) - Number(b)
    case '*':
      return Number(a) * Number(b)
    case '/':
      // 只保留整数部分
      return Math.trunc(Number(a) / Number(b))
  }
}

// console.log(evalRPN(["4","13","5","/","+"]))
console.log(evalRPN(['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+']))
