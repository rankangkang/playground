/**
 * @param {character[][]} grid
 * @return {number}
 */
let numIslands = function (grid) {
  let count = 0
  const row = grid.length
  const col = grid[0].length
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] === '1') {
        // 开始 dfs
        count += 1
        dfs(i, j)
      }
    }
  }

  return count

  function dfs(i, j) {
    if (i < 0 || j < 0 || i >= row || j >= col) {
      return
    }

    if (grid[i][j] !== '1') {
      return
    }

    grid[i][j] = '2'
    dfs(i - 1, j)
    dfs(i + 1, j)
    dfs(i, j - 1)
    dfs(i, j + 1)
  }
}

console.log(
  numIslands([
    ['1', '1', '1', '1', '0'],
    ['1', '1', '0', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
  ]),
)
