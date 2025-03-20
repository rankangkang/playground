/**
 *
 * @param {string} num
 * @returns
 */
function maxBitNum(num) {
  const binNum = Number(num).toString(2)
  let max = 0
  let i = 0
  let j = i + 1
  for (; i < binNum.length; ) {
    if (binNum[i] !== '1') {
      i++
      continue
    }

    j = i + 1
    while (binNum[j] === '1') {
      j++
    }
    max = Math.max(j - i, max)
    i = j
  }

  return max
}

console.log(maxBitNum('200'))
console.log(maxBitNum('1023'))

/**
 * 数字转二进制
 * @param {number} n
 */
function number2Binary(n) {
  let r = ''
  while (n > 0) {
    const mod = n % 2
    r = mod + r
    n = n >> 1
  }
  return r
}

console.log(number2Binary(1023))
