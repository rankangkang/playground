/**
 * @param {number[][]} grid
 * @return {number}
 */
let orangesRotting = function (grid) {
  const row = grid.length
  const col = grid[0].length
  let fresh = 0
  // 腐烂的入口
  let entries = []

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] === 1) {
        fresh++
      } else if (grid[i][j] === 2) {
        entries.push([i, j])
      }
    }
  }

  let ans = 0
  while (fresh && entries.length) {
    // 经过一分钟
    ans++
    const tmp = entries
    entries = []

    // 遍历已经腐烂的橘子
    for (const [x, y] of tmp) {
      const directions = [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
      ]
      for (const [i, j] of directions) {
        if (i >= 0 && i < row && j >= 0 && j < col && grid[i][j] === 1) {
          // 感染新鲜橘子
          fresh--
          grid[i][j] = 2
          entries.push([i, j])
        }
      }
    }
  }

  return fresh ? -1 : ans
}
