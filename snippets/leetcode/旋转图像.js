/**
 * tag: 中等
 * 分批次，一层层旋转，以四个点
 */
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
let rotate = function (matrix) {
  const n = matrix.length
  for (let i = 0; i < Math.floor(n / 2); i++) {
    for (let j = 0; j < Math.floor((n + 1) / 2); j++) {
      // 顺时针旋转 90 度
      ;[matrix[i][j], matrix[n - 1 - j][i], matrix[n - 1 - i][n - 1 - j], matrix[j][n - 1 - i]] = [
        matrix[n - 1 - j][i],
        matrix[n - 1 - i][n - 1 - j],
        matrix[j][n - 1 - i],
        matrix[i][j],
      ]
    }
  }
}
