// 最大利润

/**
 * 股票最大利润
 * @param {number[]} prices 
 * @returns {number}
 */
function solution(prices) {
  if (!prices || prices.length === 0) return 0
  let profit = 0;
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

console.log(solution([7,1,5,3,6,4]))
console.log(solution([7,6,4,3,1]))

// TODO: 动态规划的方式解决
function solution2() {}
