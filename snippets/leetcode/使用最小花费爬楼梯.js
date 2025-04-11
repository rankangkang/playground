/**
 * tag: 简单
 * 动态规划
 */
/**
 * @param {number[]} cost
 * @return {number}
 */
let minCostClimbingStairs = function (cost) {
  const len = cost.length
  const dp = new Array(len + 1).fill(0)
  // dp[i] = min(dp[i - 1] + cost[i], dp[i - 2] + cost[i - 2])
  for (let i = 2; i <= cost.length; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
  }
  return dp[len]
}

console.log(minCostClimbingStairs([10, 15, 20]))
