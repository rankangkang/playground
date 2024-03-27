/**
 * 字符串相加
 * @param {string} s1 
 * @param {string} s2 
 * @returns {string}
 */
function solution(s1, s2) {
  let carry = 0
  let resultArray = []
  console.log(s1, s2)
  const maxLen = Math.max(s1.length, s2.length)
  if (s1.length < maxLen) {
    s1 = new Array(maxLen - s1.length).fill('0').join('') + s1
  }
  if (s2.length < maxLen) {
    s2 = new Array(maxLen - s2.length).fill('0').join('') + s2
  }

  for (let i = maxLen - 1; i >=0; i--) {
    const t = Number(s1[i]) + Number(s2[i]) + carry
    carry = Math.floor(t / 10)
    const r = t % 10
    resultArray.unshift(r)
  }

  if (carry > 0) {
    resultArray.unshift(carry)
  }

  return resultArray.join('')
}

console.log(solution('9133', '0'))
