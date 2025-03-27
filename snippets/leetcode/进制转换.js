/**
 * 进制转换
 * @param {number} num
 * @param {number} radix
 * @return {string}
 */
let convertToRadix = function (num, radix) {
  // 利用 num.toString() 转换
  // return num.toString(radix)

  if (num === 0) {
    return '0'
  }

  // 遇到负数，转为正数后操作
  let prefix = ''
  let res = ''
  if (num < 0) {
    prefix = '-'
    num = Math.abs(num)
  }

  while (num > 0) {
    const mod = num % radix
    res = mod + res
    num = Math.floor(num / radix)
  }

  return prefix + res
}

console.log(convertToRadix(-7, 7))
