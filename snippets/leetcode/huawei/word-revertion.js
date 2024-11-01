/**
 * 输入一个英文文章片段，翻转指定区域的单词顺序，标点符号和普通字母一样处理.
 * 例如输入字符串
 * I am a developer.
 * [0,3]
 * 则输出
 * developer. a am I
 * @param {string} str
 * @param {number} start
 * @param {number} end
 */
function solution(str, start, end) {
  const strArr = str.split(' ').filter((s) => !!s.trim())
  const prefix = strArr.slice(0, start)
  const suffix = strArr.slice(end + 1)
  const target = strArr.slice(start, end + 1).reverse()
  return [...prefix, ...target, ...suffix].join(' ')
}

console.log(solution('I am a developer.', 0, 3))
