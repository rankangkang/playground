/**
 * tag: 简单
 * @param {number} numRows
 * @return {number[][]}
 */
let generate = function (numRows) {
  const r = []
  for (let i = 0; i < numRows; i++) {
    const rowLen = i + 1
    const row = new Array(rowLen).fill(1)
    const prevRow = r[i - 1] || [1]
    for (let j = 1; j < rowLen - 1; j++) {
      row[j] = prevRow[j] + prevRow[j - 1]
    }
    r.push(row)
  }
  return r
}
