/**
 * 盛水最多的容器
 * @param {number[]} nums
 */
let maxArea = function (nums) {
  let left = 0
  let right = nums.length - 1
  let max = 0
  while (left < right) {
    const width = right - left
    const height = Math.min(nums[left], nums[right])
    const area = width * height
    if (area > max) {
      max = area
    }
    if (nums[left] === height && nums[left + 1] > height) {
      left++
    } else if (nums[right] === height && nums[right - 1] > height) {
      right--
    } else {
      break
    }
  }

  return max
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))
