/**
 * tag: 中等
 * 给定一个经过编码的字符串，返回它解码后的字符串。
 * 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。
 * 注意 k 保证为正整数。你可以认为输入字符串总是有效的；
 * 输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
 * 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
 */
/**
 * @param {string} s
 * @return {string}
 */
let decodeString = function (s) {
  /**
   * @type {Array<{ repeat: number; snippet: string }>}
   */
  const stack = []
  let repeatStr = ''
  stack.push({
    repeat: 1,
    snippet: '',
  })

  for (let i = 0; i < s.length; i++) {
    const char = s.charAt(i)
    if (char === '[') {
      // 入栈一个新的元素
      stack.push({
        repeat: Number(repeatStr) || 1,
        snippet: '',
      })
      repeatStr = ''
    } else if (char === ']') {
      const { repeat, snippet } = stack.pop() || {}
      const str = snippet?.repeat(repeat)
      stack.at(-1).snippet += str
    } else if (char >= '0' && char <= '9') {
      repeatStr += char
    } else {
      stack.at(-1).snippet += char
    }
  }

  return stack.at(0).snippet
}

console.log(decodeString('3[a]2[bc]'))

/**
 * 以 `3[abcd]` 来讲：
 * 1. 遇到数字记录数字 repeat
 * 2. 数字后一定跟的左括号，遇到左括号说明数字已经确定，记录 repeat 为 3，括号内的内容会重复3 遍，将此前记录的 snippet 和 数字压入栈中
 * 3. 遇到字符就把字符添加到临时片段 snippet 上
 * 4. 遇到右括号说明括号内的临时片段已经全部被记录，将内容重复栈顶记录的 repeat 次数，追加到栈顶的字符串后，并出栈。
 */
