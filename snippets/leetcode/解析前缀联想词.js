/**
 * 给出一个单词列表，输出这个列表的前缀联想对象
 * 如：['test', 'tesa'] 对应 { 't': { 'e': { 's': { 't': null, 'a': null } } } }
 * 如此，可在输入对应的前缀时，快速查找出匹配的单词
 * @param {string[]} list
 */
function parse(list, memo = {}) {
  for (const word of list) {
    if (word.length) {
      const firstChar = word[0]
      memo[firstChar] = {}
    }
  }

  for (const key in memo) {
    if (Object.hasOwn(memo, key)) {
      const nextList = list
        .filter((item) => {
          return item[0] === key
        })
        .map((item) => item.slice(1))
        .filter(Boolean)

      if (nextList.length === 0) {
        memo[key] = null
      } else {
        parse(nextList, memo[key])
      }
    }
  }

  return memo
}

console.log(
  JSON.stringify(
    parse(['trans', 'transfer', 'transform', 'train', 'translator', 'test', 'abandon']),
  ),
)
