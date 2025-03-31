/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
let containsNearbyDuplicate = function (nums, k) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i]
    const list = map.get(n) || []
    list.push(i)
    map.set(n, list)
  }

  for (const [, list] of map) {
    if (
      list.some((value, index) => {
        if (index === 0) {
          return false
        }

        return value - list[index - 1] <= k
      })
    ) {
      return true
    }
  }

  return false
}
