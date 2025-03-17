/* eslint-disable */

/**
 * tag: 中等，非暴力解法感觉偏难，需要转换下思路
 * 给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 0 来代替。
 */

/**
 * 引入单调栈（单调递减），当遍历到的元素比栈顶的下标代表的值大时，说明栈顶下标的最近更高温度就是当前遍历到的元素（因为栈是先进后出）
 * @param {number[]} temperatures
 * @return {number[]}
 */
let dailyTemperatures = function (temperatures) {
  const len = temperatures.length
  const res = new Array(len).fill(0)
  // 存储下标的栈，栈顶到栈底单调递减
  const stack = []
  for (let i = 0; i < len; i++) {
    const temperature = temperatures[i]
    while (stack.length > 0 && temperature > temperatures[stack[stack.length - 1]]) {
      const prevIndex = stack.pop()
      res[prevIndex] = i - prevIndex
    }
    stack.push(i)
  }

  return res
}

Array.prototype.last = function () {
  return this[this.length - 1]
}

Array.prototype.first = function () {
  return this[0]
}

/**
 * 每日温度
 * @param {number[]} temperatures
 */
function dailyTemperaturesRight(temperatures) {
  const stack = []
  const len = temperatures.length
  const res = new Array(len).fill(0)

  for (let i = len - 1; i >= 0; i--) {
    const temp = temperatures[i]
    while (stack.length && temperatures[stack.last()] <= temp) {
      stack.pop()
    }

    if (stack.length) {
      res[i] = stack.last() - i
    }

    stack.push(i)
  }

  return res
}

console.log(dailyTemperaturesRight([73, 74, 75, 71, 69, 72, 76, 73]))
