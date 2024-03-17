/**
 * 给定两个字符串，从字符串2中找出字符串1中的所有字符，去重并按照ASCII码值从小到大排列。
 * @param {*} set 
 * @param {*} str 
 * @returns 
 */
function solution(set, str) {
  const strArr = str.split('')
  const result = []
  strArr.map(c => {
    if (set.includes(c) && !result.includes(c)) {
      result.push(c)
    }
  })

  
  result.sort((a, b) => {
    if (a > b) {
      return 1
    }
    if (a < b) {
      return -1
    }
    return 0
  })

  return result.join('')
}

console.log(solution('bach', 'bbaaccddfg'))
