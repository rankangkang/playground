/**
 * @param {number} num
 * @return {string}
 */
let intToRoman = function (num) {
  const thousand = Math.floor(num / 1000)
  num = num % 1000
  const hundred = Math.floor(num / 100)
  num = num % 100
  const ten = Math.floor(num / 10)
  num = num % 10
  const count = num

  return Roma[3][thousand] + Roma[2][hundred] + Roma[1][ten] + Roma[0][count]
}

const Roma = [
  ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'], // 个位
  ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'], // 十位
  ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'], // 百位
  ['', 'M', 'MM', 'MMM'], // 千位
]
