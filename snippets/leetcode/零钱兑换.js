/**
 * 带 memo 的动态规划，不带 memo 会超时
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
let coinChange = function (coins, amount) {
  // return dp(coins, amount)
  return dpItr(coins, amount)
}

function dp(coins, amount, memo = new Map()) {
  if (amount === 0) {
    return 0
  }
  if (amount < 0) {
    return -1
  }
  if (coins.includes(amount)) {
    return 1
  }

  let res = Infinity
  for (const coin of coins) {
    let num
    let nextAmount = amount - coin
    if (memo.has(nextAmount)) {
      num = memo.get(nextAmount)
    } else {
      num = dp(coins, nextAmount, memo)
      memo.set(nextAmount, num)
    }
    if (num < 0) {
      continue
    }
    res = Math.min(res, num + 1)
  }

  return res === Infinity ? -1 : res
}

console.log(coinChange([1, 2, 5], 100))

// 可以考虑使用迭代 dp 数组（dp 数组体现在下标，dp 函数体现在参数），即自底向上的动态规划。
function dpItr(coins, amount) {
  // 数组大小为 amount + 1，初始值也为 amount + 1
  let dp = new Array(amount + 1).fill(Infinity)
  dp[0] = 0
  for (const coin of coins) {
    dp[coin] = 1
  }

  // 外层 for 循环在遍历所有状态的所有取值
  for (let i = 1; i < dp.length; i++) {
    // 内层 for 循环在求所有选择的最小值
    for (let coin of coins) {
      // 子问题无解，跳过
      if (i < coin) {
        continue
      }

      // amount = i - coin 时，到达 i 只需一步，取它们的最小值
      dp[i] = Math.min(dp[i], 1 + dp[i - coin])
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount]
}
