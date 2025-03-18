/**
 * tag: 中等
 * https://www.nowcoder.com/practice/5190a1db6f4f4ddb92fd9c365c944584?tpId=37&tqId=21249&rp=1&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D37&difficulty=3&judgeStatus=undefined&tags=&title=
 */

/**
 * @param {string} str
 */
function sortString(str) {
  // 1. 由非字母的字符分割
  // 2. 同字母（不区分大小写）按照顺序
  // 3. 其他类型字符保持原有位置不变

  // 先将字母全部抽出来，排序，然后再次遍历原字符串，遇到非字母就直接拼接，遇到字母就从排序后的列表取出第一个拼接
  let letterList = []
  for (let i = 0; i < str.length; i++) {
    const ch = str.charAt(i)
    if (isLetter(ch)) {
      letterList.push(ch)
    }
  }

  sortLetter(letterList)

  let result = ''
  for (let i = 0; i < str.length; i++) {
    const ch = str.charAt(i)
    if (isLetter(ch)) {
      result += letterList.shift()
    } else {
      result += ch
    }
  }

  return result
}

/**
 *
 * @param {string[]} arr
 */
function sortLetter(arr) {
  return arr.sort((a, b) => {
    return a.toLowerCase().charCodeAt(0) - b.toLowerCase().charCodeAt(0)
  })
}

/**
 * @param {string} ch
 */
function isLetter(ch) {
  const charCode = ch.charCodeAt(0)
  if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
    return true
  }

  return false
}

console.log(sortString('Hello NowCoder!'))
