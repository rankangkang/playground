// 最大利润

/**
 * 股票最大利润
 * @param {number[]} prices
 * @returns {number}
 */
function solution(prices) {
  if (!prices || prices.length === 0) return 0
  let profit = 0
  for (let buy = 0; buy < prices.length - 1; buy++) {
    for (let sell = prices.length - 1; sell > buy; sell--) {
      const tmp = prices[sell] - prices[buy]
      if (tmp > profit) {
        profit = tmp
      }
    }
  }

  return profit
}

console.log(solution([7, 1, 5, 3, 6, 4]))
console.log(solution([7, 6, 4, 3, 1]))

/**
 * 动态规划方式实现，买入 cost 一定在卖出 price 之前
 * 那么在遍历 prices 时，只需要记录下遍历位置前的最低 cost，计算并记录最大利润（此前记录的最大利润与当前位置 price - cost 比较）
 * 数组遍历完成后，即可获取最大利润
 * @param {number[]} prices
 * @return {number}
 */
let maxProfit = function (prices) {
  // 动态规划
  let cost = Infinity
  let profit = 0
  for (let i = 0; i < prices.length; i++) {
    const price = prices[i]
    cost = Math.min(cost, price)
    profit = Math.max(profit, price - cost)
  }

  return profit
}

/**
 * 给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。返回 你能获得的 最大 利润 。
 * @param {number[]} prices
 * @return {number}
 * @description 没那么复杂，涨就卖，跌就不买。把所有利润都拿到，所有亏损都规避。
 */
let maxProfit2 = function (prices) {
  let profit = 0
  for (let i = 0; i < prices.length - 1; i++) {
    const cost = prices[i]
    const price = prices[i + 1]
    // 有利润直接卖
    profit += Math.max(0, price - cost)
  }
  return profit
}
