/**
 * tag: 中等
 * 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：
 * - 每行的元素从左到右升序排列。
 * - 每列的元素从上到下升序排列。
 */
/**
 * 这个矩阵形似一个相对于右上或左下的二叉搜索树
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
let searchMatrix = function (matrix, target) {
  const row = matrix.length
  const col = matrix[0].length
  // 是一个相对于右上角的二叉搜索树
  let i = 0
  let j = col - 1
  while (true) {
    if (i >= row || j < 0) {
      return false
    }

    const curr = matrix[i][j]
    if (curr === target) {
      return true
    }

    if (curr < target) {
      // 在右边
      i = i + 1
    } else {
      j = j - 1
    }
  }
}

console.log(
  searchMatrix(
    [
      [1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30],
    ],
    5,
  ),
)
console.log(
  searchMatrix(
    [
      [1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30],
    ],
    20,
  ),
)
