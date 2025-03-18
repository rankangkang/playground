/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} threshold
 * @return {number}
 */
let numOfSubarrays = function (arr, k, threshold) {
  let sum = 0
  let count = 0
  const thresholdSum = threshold * k
  for (let i = 0; i < arr.length; i++) {
    if (i < k) {
      sum += arr[i]
      if (i === k - 1 && sum >= thresholdSum) {
        count++
      }
      continue
    }

    const nextSum = sum + arr[i] - arr[i - k]
    if (nextSum >= thresholdSum) {
      count++
    }
    sum = nextSum
  }

  return count
}

console.log(numOfSubarrays([11, 13, 17, 23, 29, 31, 7, 5, 2, 3], 3, 5))
