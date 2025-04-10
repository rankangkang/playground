/**
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 */
let climbStairs = function (n) {
  const memo = {}
  function dp(n) {
    if (n <= 2) {
      return n
    }

    if (memo[n]) {
      return memo[n]
    }

    return (memo[n] = dp(n - 1) + dp(n - 2))
  }

  return dp(n)
}

console.time('climb-stairs')
console.log(climbStairs(100))
console.timeEnd('climb-stairs')

/**
 * 状态转移：dp[i] = dp[i - 1] + dp[i - 2]
 * @param {number} n
 */
function solution(n) {
  const dp = new Array(n + 1).fill(0)
  dp[1] = 1
  dp[2] = 2
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}

console.time('climb-stairs')
console.log(solution(100))
console.timeEnd('climb-stairs')
