/**
 * 本题非背包问题
 * @param {number[]} capacity
 * @param {number[]} rocks
 * @param {number} additionalRocks
 * @return {number}
 */
let maximumBags = function (capacity, rocks, additionalRocks) {
  const leftCapacity = capacity.map((item, idx) => item - rocks[idx]).sort((a, b) => a - b)
  let res = 0
  for (let i = 0; i < leftCapacity.length; i++) {
    const leftSpace = leftCapacity[i]
    if (leftSpace > additionalRocks) {
      return res
    }
    res++
    additionalRocks -= leftSpace
  }
  return res
}

console.log(maximumBags([2, 3, 4, 5], [1, 2, 4, 4], 2))
