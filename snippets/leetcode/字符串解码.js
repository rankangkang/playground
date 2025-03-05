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
var decodeString = function (s) {
  const repeatStack = []
  const strStack = []

  // 字符片段，存储结果
  let snippet = ''
  // 当前的重复次数
  let repeat = 0;
  const len = s.length
  for (let i = 0; i < len; i++) {
    const ch = s.charAt(i)
    if (ch >= '0' && ch <= '9') {
      // 是数字
      repeat = repeat * 10 + Number(ch)
    } else if (ch === '[') {
      // 遇到左括号，将数字压入 repeatStack
      repeatStack.push(repeat)
      repeat = 0;
      strStack.push(snippet)
      snippet = ''
    } else if (ch === ']') {
      // 遇到右括号，操作与之匹配的左括号之间的字符
      const repeatTime = repeatStack.pop()
      // 重复 repeat 遍，追加到 strStack 尾部的内容后
      let tmp = snippet.repeat(repeatTime)
      snippet = strStack.pop() + tmp;
    } else {
      // 是字母，添加到 snippet 之后
      snippet = snippet + ch
    }
  }

  return snippet;
};

console.log(decodeString("3[a]2[bc]"))

/**
 * 以 `3[abcd]` 来讲：
 * 1. 遇到数字记录数字 repeat
 * 2. 数字后一定跟的左括号，遇到左括号说明数字已经确定，记录 repeat 为 3，括号内的内容会重复3 遍，将此前记录的 snippet 和 数字压入栈中
 * 3. 遇到字符就把字符添加到临时片段 snippet 上
 * 4. 遇到右括号说明括号内的临时片段已经全部被记录，将内容重复栈顶记录的 repeat 次数，追加到栈顶的字符串后，并出栈。
 */
