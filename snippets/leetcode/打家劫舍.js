/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  return robTo(nums, nums.length - 1)
};

function robTo(nums, lastIndex) {
  if (lastIndex <= 0) {
    return nums[lastIndex] ?? 0
  }

  // 打劫前 k - 2 家，中间空一家，要再加上最后一家
  const sum1 = robTo(nums, lastIndex - 2) + nums[lastIndex]
  // 打劫前 k - 1 家
  const sum2 = robTo(nums, lastIndex - 1)

  return Math.max(sum1, sum2)
}