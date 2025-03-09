/**
 * 带 memo 的动态规划，不带 memo 会超时
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
let coinChange = function (coins, amount) {
  return dp(coins, amount)
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

// 可以考虑使用迭代，即自底向上的动态规划。
