/**
 * 三数之和为0的三元组和
 * @param {number[]} nums 
 */
var threeNumSum = function (nums, targetSum = 0) {
  const result = []
  if (!nums || nums.length < 3) {
    return result
  }

  // 排序
  nums = nums.sort((a, b) => a - b)
  // 元素依次选中为信标，再在信标右侧（均比信标大）两端通过夹逼进行选择，直至和为0
  for (let pivot = 0; pivot < nums.length; pivot++) {
    if (nums[pivot] > targetSum) {
      break
    }

    if (pivot > 0 && nums[pivot] === nums[pivot - 1]) {
      // 去重
      continue
    }

    let left = pivot + 1
    let right = nums.length - 1
    while (left < right) {
      const sum = nums[pivot] + nums[left] + nums[right]
      if (sum > targetSum) {
        right--
      } else if (sum < targetSum) {
        left++
      } else if (sum === targetSum) {
        // 等于 0，推入结果，继续夹逼
        result.push([nums[pivot], nums[left], nums[right]])
        while (left < right && nums[left] === nums[left + 1]) left++
        while (left < right && nums[right] === nums[right - 1]) right--
        left++
        right--
      }
    }
  }

  return result
}

console.log(threeNumSum([-1, 0, 1, 2, -1, -4]))

/**
 * 四数之和为0的三元组和
 * @param {number[]} nums 
 */
var fourNumSum = function (nums, targetSum = 0) {
  if (!nums || nums.length < 4) {
    return nums
  }

  nums = nums.sort((a, b) => a - b)
  const result = []
  for (let pivot = 0; pivot < nums.length; pivot++) {
    const val = nums[pivot]
    if (val > targetSum) {
      break
    }

    if (pivot > 0 && nums[pivot - 1] === val) {
      continue
    }

    const partials = threeNumSum(nums.slice(pivot + 1), 0 - val)
    partials.forEach((p) => {
      p.unshift(val)
      result.push(p)
    })
  }

  return result
}

console.log(fourNumSum([1,0,-1,0,-2,2]))
