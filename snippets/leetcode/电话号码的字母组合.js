/**
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
 * 数字 -> 字母的映射是功能机的按钮映射
 */

const digitMap = new Map()
digitMap.set('2', ['a', 'b', 'c'])
digitMap.set('3', ['d', 'e', 'f'])
digitMap.set('4', ['g', 'h', 'i'])
digitMap.set('5', ['j', 'k', 'l'])
digitMap.set('6', ['m', 'n', 'o'])
digitMap.set('7', ['p', 'q', 'r', 's'])
digitMap.set('8', ['t', 'u', 'v'])
digitMap.set('9', ['w', 'x', 'y', 'z'])

/**
 * @param {string} digits
 * @return {string[]}
 */
let letterCombinations = function (digits) {
  let res = []
  const len = digits.length
  for (let i = 0; i < len; i++) {
    const num = digits[i]
    const chars = digitMap.get(num)
    const tmp = []
    if (res.length === 0) {
      chars.forEach((item) => {
        tmp.push(item)
      })
    } else {
      chars.forEach((item) => {
        res.forEach((resItem) => {
          tmp.push(resItem + item)
        })
      })
    }

    res = tmp
  }

  return res
}

console.log(letterCombinations('23'))
