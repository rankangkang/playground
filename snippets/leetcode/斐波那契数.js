/**
 * @param {number} n
 * @return {number}
 */
let fib = function (n) {
  // return recursive(n)
  return iterate(n)
}

function recursive(n) {
  if (n <= 1) {
    return n
  }

  return recursive(n - 1) + recursive(n - 2)
}

function iterate(n) {
  const dp = []
  dp[0] = 0
  dp[1] = 1

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  return dp[n]
}
