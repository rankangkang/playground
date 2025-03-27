/**
 * 罗马数字由 I,V,X,L,C,D,M 构成；
 * 当小值在大值的左边，则减小值，如 IV=5-1=4；
 * 当小值在大值的右边，则加小值，如 VI=5+1=6；
 */

/**
 * @param {string} s
 * @return {number}
 */
let romanToInt = function (s) {
  let res = 0

  for (let i = 0; i < s.length; i++) {
    const curr = Roma.get(s[i]) || 0
    const next = Roma.get(s[i + 1]) || 0
    // 从左到右遍历
    if (curr >= next) {
      res += curr
    } else {
      res -= curr
    }
  }

  return res
}

const Roma = new Map([
  ['I', 1],
  ['V', 5],
  ['X', 10],
  ['L', 50],
  ['C', 100],
  ['D', 500],
  ['M', 1000],
])

console.log(romanToInt('MCMXCIV'))
