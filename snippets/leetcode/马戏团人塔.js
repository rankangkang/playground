/**
 * @param {number[]} height
 * @param {number[]} weight
 * @return {number}
 */
let bestSeqAtIndex = function (height, weight) {
  const combine = []
  for (let i = 0; i < height.length; i++) {
    combine.push({ height: height[i], weight: weight[i] })
  }

  // 对升高升序排序，相同身高则体重降序，摒除身高相同时情况的影响
  combine.sort((a, b) => {
    const diff = a.height - b.height
    if (diff !== 0) {
      return diff
    }
    return b.weight - a.weight
  })

  // 对体重，取最长升序子序列
  // dp[i] 代表前 i 个元素的最长递增子序列长度
  const dp = new Array(combine.length).fill(1)
  for (let i = 0; i < combine.length; i++) {
    // 二次循环，求出 dp[i] 位置的最长递增序列
    for (let j = 0; j < i; j++) {
      if (combine[i].weight > combine[j].weight) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }

  return Math.max(...dp)
}

console.log(
  bestSeqAtIndex(
    [2868, 5485, 1356, 1306, 6017, 8941, 7535, 4941, 6331, 6181],
    [5042, 3995, 7985, 1651, 5991, 7036, 9391, 428, 7561, 8594],
  ),
)
