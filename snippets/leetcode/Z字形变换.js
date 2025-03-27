/**
 * tag: 中等
 *
 * 1. 暴力模拟
 * 将其看为对钩的形状，每个对钩为一组
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 *
 * 其中
 * P
 * A P
 * Y
 *
 * 为一组
 *
 * A
 * L S
 * I
 * 为一组
 *
 * H
 * I I
 * R
 * 为一组
 *
 * 这是规律，然后针对每组进行处理即可
 */

/**
 * 找规律，暴力模拟
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
let convert = function (s, numRows) {
  if (numRows === 1) {
    return s
  }

  /**
   * @type {number[][]}
   */
  const rowRes = new Array(numRows).fill(0).map(() => [])

  let i = 0
  while (i < s.length) {
    // 左边
    for (let j = 0; j < numRows - 1; j++) {
      const char = s[i + j]
      rowRes[j].push(char)
    }
    i = i + (numRows - 1)

    // 右边部分
    for (let j = 0; j < numRows - 1; j++) {
      const char = s[i + j]
      rowRes[numRows - j - 1].push(char)
    }

    i = i + (numRows - 1)
  }

  return rowRes.flat().join('')
}

console.log(convert('PAYPALISHIRING', 3))
console.log(convert('A', 3))

// 找规律，行数为 3 的顺序是 1232 1232 1232 ... 这样的顺序
let convert2 = function (s, numRows) {
  const temp = []
  let k = 0
  const groupSize = 2 * numRows - 2
  const groupIndexes = new Array(2 * numRows - 2).fill(0).map((_, index) => {
    if (index >= numRows) {
      return groupSize - index
    }
    return index
  })
  for (let i = 0; i < s.length; i++) {
    const char = s[i]
    temp.push([groupIndexes[k], char])
    k++
    k %= groupSize
  }

  const rowRes = new Array(numRows).fill(0).map(() => [])
  temp.forEach(([k, char]) => {
    rowRes[k].push(char)
  })

  return rowRes.flat().join('')
}

console.log(convert2('PAYPALISHIRING', 3))
