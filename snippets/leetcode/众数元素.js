/**
 * 方法一：可以排序后，取 n/2 位置的数，该数一定是众数
 * 方法二：使用 hash 表计数，返回计数最多的数
 * 方法三：消消乐，遇到不同的数就消失，最后剩余的一定是超过半数的数。
 * @param {number[]} nums
 * @return {number}
 */
let majorityElement = function (nums) {
  let count = 0
  let fruit = null
  for (const x of nums) {
    if (count === 0) {
      fruit = x
    }

    // 不相同就消掉，表现为 -1
    count += x === fruit ? 1 : -1
  }

  return fruit
}
