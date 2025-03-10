/**
 * 2维 dp 数组，dp[i][j] 表示长度为 text1 前 i 个组成的子串与 text2 前 j 个组成的子串的最长公共子序列的长度
 * dp[i][j]
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
let longestCommonSubsequence = function (text1, text2) {
  const m = text1.length
  const n = text2.length
  const dp = new Array(m + 1).fill(0).map(() => {
    return new Array(n + 1).fill(0)
  })
  // dp[i1 = 0 | i2 = 0] = 0

  // i j 指的是长度，并非下标，所以 dp[i][j] 指的是 text1[:i - 1] 与 text[:j - 1]的最长子序列
  for (let i = 1; i <= m; i++) {
    const charI = text1[i - 1]
    for (let j = 1; j <= n; j++) {
      const charJ = text2[j - 1]
      if (charI === charJ) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  return dp[m][n]
}
