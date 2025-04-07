/**
 * 假设有 m * n 的矩阵，元素可能为 "X" 与 "O"，若 "O" 完全被 "X" 包裹，则把 "O" 改写为 "X"
 */
/**
 * 利用寻路算法解决，从一个点出发，看是否能够到达边缘，是的话就可以
 * @param {string[][]} metrics
 */
function solution(metrics) {
  const row = metrics.length
  const col = metrics[0].length

  /**
   * 从 i, j 出发是否存在到达边界的通路
   */
  function findWay(i, j, memo = new Array(row).fill(0).map(() => new Array(col).fill(null))) {
    // 已经走过了，直接返回
    if (memo[i][j]) {
      return false
    }

    // 标记当前路径已经走过了
    memo[i][j] = 1
    if (i < 0 || i >= row || j < 0 || j >= col) {
      return false
    }

    if (metrics[i][j] !== 'X') {
      if (i === 0 || i === row - 1 || j === col - 1 || j === 0) {
        // 到达边缘
        return true
      }

      return (
        findWay(i - 1, j, memo) ||
        findWay(i + 1, j, memo) ||
        findWay(i, j - 1, memo) ||
        findWay(i, j + 1, memo)
      )
    }

    return false
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const curr = metrics[i][j]
      if (curr === 'X') {
        continue
      }

      if (findWay(i, j)) {
        continue
      }

      metrics[i][j] = 'X'
    }
  }

  return metrics
}

console.log(
  solution([
    ['X', 'X', 'X', 'O', 'X', 'X', 'X', 'X'],
    ['X', 'O', 'O', 'X', 'O', 'X', 'O', 'O'],
    ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X'],
    ['X', 'X', 'X', 'O', 'X', 'X', 'X', 'X'],
    ['O', 'O', 'O', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'O', 'X', 'X', 'X', 'X', 'X', 'X'],
  ]),
)
