/**
 * tag: 简单，可使用二次遍历暴力解答，也可使用单调栈进阶
 * 给你一个数组 prices ，其中 prices[i] 是商店里第 i 件商品的价格。
 * 商店里正在进行促销活动，如果你要买第 i 件商品，那么你可以得到与 prices[j] 相等的折扣，其中 j 是满足 j > i 且 prices[j] <= prices[i] 的 最小下标 ，如果没有满足条件的 j ，你将没有任何折扣。
 * 请你返回一个数组，数组中第 i 个元素是折扣后你购买商品 i 最终需要支付的价格。
 */

/**
 * 从左到右遍历，单调栈（单调递减），栈顶元素大于目标则计算并出栈
 * @param {number[]} prices
 */
function finalPrices(prices) {
  let indexStack = []
  const res = [...prices]
  const len = prices.length
  for (let i = 0; i < len; i++) {
    const price = prices[i]
    // 越靠近栈顶的元素离当前元素越近，故仅需当前元素小于栈顶元素时，即可记录答案，并出栈，继续校验下一个
    while (indexStack.length && prices[indexStack.at(-1)] >= price) {
      const idx = indexStack.pop()
      res[idx] = prices[idx] - price
    }
    indexStack.push(i)
  }

  return res
}

console.log(finalPrices([8, 4, 6, 2, 3]))
