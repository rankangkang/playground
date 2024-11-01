/**
 * 双十一众多商品进行打折销售，小明想购买一些自己心仪的商品，但由于受购买资金限制，所以他决定从众多心意商品中购买3件，而且想尽可能的花完资金，现在请你设计一个程序帮助小明计算尽可能花费的最大资金额。
 * 解题思路：参照三数之和
 * 解题思路2：回溯（但我还不会）
 * @param {number[]} products 产品价格
 * @param {number} budget 预算
 */
function solution(products, budget) {
  products = products.sort((a, b) => a - b)
  if (products.length < 3) {
    return -1
  }

  let tb = products[0] + products[1] + products[2]
  if (tb > budget) {
    return -1
  }

  // 参照三数之和
  let result = tb
  for (let idx = 0; idx < products.length; idx++) {
    let left = idx + 1
    let right = products.length - 1
    while (left < right) {
      const t = products[idx] + products[left] + products[right]
      if (t === budget) {
        return budget
      }
      if (t > budget) {
        right--
      } else {
        if (t > result) {
          result = t
        }
        left++
      }
    }
  }

  return result
}

console.log(solution([23, 26, 36, 27], 78))
