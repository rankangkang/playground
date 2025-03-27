/**
 * tag: 中等
 * 给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。
 * https://leetcode.cn/problems/set-matrix-zeroes/description
 */

/**
 * 两次遍历，第一次记录出现 0 的行与列，第二次进行修改
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
let setZeroes = function (matrix) {
  const rowSize = matrix.length
  const colSize = matrix[0].length
  const rowSet = new Set()
  const colSet = new Set()
  // 找
  for (let i = 0; i < rowSize; i++) {
    for (let j = 0; j < colSize; j++) {
      if (matrix[i][j] === 0) {
        rowSet.add(i)
        colSet.add(j)
      }
    }
  }

  // 原地修改
  for (let i = 0; i < rowSize; i++) {
    for (let j = 0; j < colSize; j++) {
      if (rowSet.has(i) || colSet.has(j)) {
        // 这行或列有 0
        matrix[i][j] = 0
      }
    }
  }
}
