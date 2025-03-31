/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
let twoSum = function (nums, target) {
  const map = new Map()
  nums.forEach((num, index) => {
    map.set(num, index)
  })

  for (let i = 0; i < nums.length; i++) {
    const n = nums[i]
    const diff = target - n
    if (map.has(diff) && map.get(diff) !== i) {
      return [i, map.get(diff)]
    }
  }

  return []
}

console.log(twoSum([3, 2, 4], 6))
