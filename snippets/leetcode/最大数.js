/**
 * tag: 中等
 * https://leetcode.cn/problems/largest-number/description/
 */
/**
 * 二者组成字符串后直接比较，对较大的那个串来说，前面的子串相对位置一定在后面的子串左边
 * 如：123 与 21，组成后为 12321 与 21123，比较发现 21123 > 12321，则子串 21 的相对位置一定在子串 123 左边
 * @param {number[]} nums
 * @return {string}
 */
let largestNumber = function (nums) {
  const numStrs = nums.map(String)
  const res = numStrs
    .sort((a, b) => {
      // 自定义比较，看哪个组成的数大，谁大放前面
      return Number(b + a) - Number(a + b)
    })
    .join('')

  if (res[0] === '0') {
    // 组成的最大数有前导 0，说明输入都为 0，直接返回 0
    return '0'
  }

  return res
}
