/**
 * tag: 简单
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/
 */

/**
 * 维护最低成本与最大利润，由于卖出必须在买入之后，遍历一次即可
 * @param {number[]} prices
 * @return {number}
 */
let maxProfit = function (prices) {
  let cost = Infinity
  let profit = 0
  for (const sellPrice of prices) {
    cost = Math.min(sellPrice, cost)
    profit = Math.max(profit, sellPrice - cost)
  }

  return profit
}

/**
 * tag: 中等
 * 买卖股票的最佳时机 2
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/
 */

/**
 * 把所有利润都赚到，就是最大利润
 * @param {number[]} prices
 * @return {number}
 */
let maxProfit2 = function (prices) {
  let maxProfit = 0
  for (let i = 0; i < prices.length - 1; i++) {
    const cost = prices[i]
    const price = prices[i + 1]
    const profit = price - cost
    if (profit > 0) {
      maxProfit += profit
    }
  }

  return maxProfit
}
