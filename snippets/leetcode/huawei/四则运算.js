// /**
//  *
//  * @param {string} expression
//  */
// function calculation(expression) {
//   const stack = []
//   let tempExpr = ''

//   const leftBracket = new Set(['[', '{', '('])
//   const rightBracket = new Set([']', '}', ')'])

//   for (let i = 0; i < expression.length; i++) {
//     const ch = expression.charAt(i)
//     if (leftBracket.has(ch)) {
//       stack.push(tempExpr)
//       tempExpr = ''
//       continue
//     }
//     if (rightBracket.has(ch)) {
//       // 计算这个表达式，并插入到栈顶元素最后
//       const temp = eval(tempExpr)
//       tempExpr = stack.pop()
//       tempExpr += temp
//       continue
//     }

//     tempExpr += ch
//   }

//   return eval(tempExpr)
// }

// console.log(calculation('3+2*{1+2*[-4/(8-6)+7]}'))

/**
 * 涉及到算式转后波兰表达式，然后使用后波兰表达式计算结果
 * https://www.nowcoder.com/practice/9999764a61484d819056f807d2a91f1e?tpId=37&rp=1&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D37&difficulty=&judgeStatus=&tags=&title=HJ5&gioEnter=menu
 */

/**
 * 分词算法
 * @param {string} expr
 */
function tokenize(expr) {
  const operators = new Set(['+', '-', '*', '/', '(', ')'])
  const tokens = []
  let tempExpr = ''
  for (let i = 0; i < expr.length; i++) {
    const char = expr.charAt(i)
    if (char === '-' && !tempExpr && (i === 0 || tokens.at(-1) === '(')) {
      // 处理负数
      if (tempExpr) {
        tokens.push(tempExpr)
        tempExpr = ''
      }
      tempExpr += '-'
    } else if (operators.has(char)) {
      // 遇到操作符，则推入分词
      if (tempExpr) {
        tokens.push(tempExpr)
        tempExpr = ''
      }
      tokens.push(char)
    } else if ((char >= '0' && char <= '9') || char === '.') {
      // 数字，拼词
      tempExpr += char
    } else if (char === ' ') {
      // 空白字符
      if (tempExpr) {
        tokens.push(tempExpr)
        tempExpr = ''
      }
    } else {
      throw Error(`Invalid character: ${char}`)
    }
  }

  if (tempExpr) {
    tokens.push(tempExpr)
  }

  return tokens
}

/**
 * 转逆波兰表达式
 * @param {string[]} tokens
 */
function infix2Postfix(tokens) {
  const priority = new Map([
    ['+', 1],
    ['-', 1],
    ['*', 2],
    ['/', 2],
  ])

  const output = []
  const stack = []
  for (const token of tokens) {
    if (/\d/.test(token)) {
      // 数字，直接推入
      output.push(token)
    } else if (priority.has(token)) {
      // 运算符,遇到优先级更高（相比栈顶）的就入栈，否则出栈，直至栈顶优先级相比当前更低，再入栈
      while (
        stack.length &&
        stack.at(-1) !== '(' &&
        priority.get(stack.at(-1)) >= priority.get(token)
      ) {
        output.push(stack.pop())
      }
      stack.push(token)
    } else if (token === '(') {
      stack.push(token)
    } else if (token === ')') {
      while (stack.at(-1) !== '(') {
        output.push(stack.pop())
      }
      // 遇到左括号，弹出
      stack.pop()
    } else {
      throw new Error(`invalid token: ${token}`)
    }
  }

  while (stack.length) {
    if (stack.at(-1) === '(') {
      throw Error(`invalid bracket pair`)
    }
    output.push(stack.pop())
  }

  return output
}

// 计算
function calc(a, b, operator) {
  const na = Number(a)
  const nb = Number(b)
  switch (operator) {
    case '+':
      return na + nb
    case '-':
      return na - nb
    case '*':
      return na * nb
    case '/':
      return na / nb
  }
  return 0
}

/**
 *
 * @param {string[]} postfixes
 */
function perform(postfixes) {
  const stack = []
  const operators = new Set(['+', '-', '*', '/'])
  for (let i = 0; i < postfixes.length; i++) {
    const token = postfixes[i]
    if (operators.has(token)) {
      const b = stack.pop()
      const a = stack.pop()
      const temp = calc(a, b, token)
      stack.push(temp)
    } else {
      stack.push(token)
    }
  }

  return stack[0]
}

function calculation(input) {
  const tokens = tokenize(input)
  const postfixes = infix2Postfix(tokens)
  console.log(tokens)
  const res = perform(postfixes)
  return res
}

console.log(calculation('3+2*(1+2*(-4/(8-6)+7))'))
// console.log(calculation('1+2*3-4'))
// console.log(calculation('3+2*(1+2*((0-4)/(8-6)+7))'))
