/**
 * 暴力枚举
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
let canCompleteCircuit = function (gas, cost) {
  const len = gas.length
  const getIdx = (index) => {
    return (index + len) % len
  }

  for (let i = 0; i < len; i++) {
    let can = true
    const start = i
    let total = gas[i]
    let j = getIdx(start + 1)
    while (j !== start) {
      const prevIdx = getIdx(j - 1)
      total = total - cost[prevIdx]
      if (total < 0) {
        can = false
        break
      }

      total += gas[j]
      j = getIdx(j + 1)
    }

    // j = start，单独检测
    if (j === start) {
      const prevIdx = getIdx(j - 1)
      total = total - cost[prevIdx]
      if (total < 0) {
        can = false
      }
    }

    if (can) {
      return start
    }
  }

  return -1
}

console.log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]))
console.log(canCompleteCircuit([2, 3, 4], [3, 4, 3]))
