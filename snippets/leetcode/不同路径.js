/**
 * 递归动态规划，dp[i][j] = dp[i-1][j] + dp[i][j-1]
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
let uniquePaths = function (m, n) {
  const memo = new Array(m).fill(0).map(() => new Array(n).fill(-1))
  memo[0][0] = 1

  function dp(i, j) {
    if (i < 0 || j < 0) {
      return 0
    }

    if (memo[i][j] > -1) {
      return memo[i][j]
    }

    return (memo[i][j] = dp(i - 1, j) + dp(i, j - 1))
  }

  return dp(m - 1, n - 1)
}

console.log(uniquePaths(3, 3))

/**
 * dp 数组
 * @param {number} m
 * @param {number} n
 * @returns
 */
function uniquePaths2(m, n) {
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
  // 从原点开始横向或纵向的格子（0, *）（*， 0）只能通过一条路径达到（一直向下或一直向右）
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 1
        continue
      }
    }
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }

  return dp[m - 1][n - 1]
}

console.log(uniquePaths2(3, 3))
