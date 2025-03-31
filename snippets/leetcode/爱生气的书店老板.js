/**
 * 大概提议是①求连续长度子数组的最大值，与②外部 grumpy[i] === 0 的值的和
 * ①可用滑窗
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} minutes
 * @return {number}
 */
let maxSatisfied = function (customers, grumpy, minutes) {
  // grumpySum[0] 代表老板不会生气的分钟数的满意的顾客的和，累加即可
  // grumpySum[1] 代表定长滑窗老板生气的和，使用滑窗
  const grumpySum = [0, 0]
  // 记录滑窗过程中最大的 grumpySum1
  let maxGrumpy1Sum = 0

  for (let i = 0; i < customers.length; i++) {
    const isGrumpy = grumpy[i]
    grumpySum[isGrumpy] += customers[i]

    if (i < minutes - 1) {
      // 长度未达到滑窗长度
      continue
    }

    maxGrumpy1Sum = Math.max(grumpySum[1], maxGrumpy1Sum)

    // 移出滑窗
    const leftIndex = i - minutes + 1
    const isLeftGrumpy = grumpy[leftIndex]
    // 左边缘老板会生气，滑出窗口需要减掉
    if (isLeftGrumpy) {
      grumpySum[isLeftGrumpy] -= customers[leftIndex]
    }
  }

  return grumpySum[0] + maxGrumpy1Sum
}

console.log(maxSatisfied([1, 0, 1, 2, 1, 1, 7, 5], [0, 1, 0, 1, 0, 1, 0, 1], 3))
console.log(maxSatisfied([8, 8], [1, 0], 2))
