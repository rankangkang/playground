/**
 * 列竖式相乘
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
let multiply = function (num1, num2) {
  if (num1 === '0' || num2 === '0') {
    return '0'
  }

  let res = '0'
  const len = num2.length
  for (let i = len - 1; i >= 0; i--) {
    const n = num2[i]
    const n2 = num1 + '0'.repeat(len - i - 1)

    const temp = singleMultiply(+n, n2)
    res = add(res, temp)
  }

  return res
}

/**
 * 两数相加
 * @param {string} s1
 * @param {*} s2
 * @returns
 */
function add(s1, s2) {
  let carry = 0
  let resultArray = []
  const maxLen = Math.max(s1.length, s2.length)
  // 高位补 0
  if (s1.length < maxLen) {
    s1 = '0'.repeat(maxLen - s1.length) + s1
  }
  if (s2.length < maxLen) {
    s2 = '0'.repeat(maxLen - s2.length) + s2
  }

  for (let i = maxLen - 1; i >= 0; i--) {
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

/**
 * 数与单数相乘，本质还是加法
 * @param {number} n
 * @param {string} num
 * @returns
 */
function simpleMultiply(n, num) {
  if (n === 0 || num === '0') {
    return '0'
  }

  let res = '0'
  while (n > 0) {
    res = add(res, num)
    n--
  }

  return res
}

/**
 * 数与单数相乘
 * @param {number} n
 * @param {string} num
 * @returns
 */
function singleMultiply(n, num) {
  const res = new Array(num.length + 1).fill(0)
  const len = num.length
  for (let i = len - 1; i >= 0; i--) {
    const item = +num[i]
    const currIdx = i + 1

    const temp = n * item + res[currIdx]
    const curr = temp % 10
    const carry = Math.floor(temp / 10)
    res[currIdx] = curr
    res[currIdx - 1] += carry
  }

  while (res[0] === 0) {
    res.shift()
  }

  return res.join('')
}

console.log(singleMultiply('9', '9'))
