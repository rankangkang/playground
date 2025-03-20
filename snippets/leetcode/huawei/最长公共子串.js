/**
 * 中等
 * https://www.nowcoder.com/practice/98dc82c094e043ccb7e0570e5342dd1b?tpId=37&rp=1&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D37&difficulty=&judgeStatus=&tags=&title=HJ75&gioEnter=menu
 */

/**
 *
 * @param {string} s1
 * @param {string} s2
 */
function findLongestCommonSubString(s1, s2) {
  const len1 = s1.length
  const len2 = s2.length
  // dp[i][j] 为 以 s1[i - 1] 结尾 且 以 s2[j - 1] 结尾的最长子串的长度
  // 故在遍历完成后，取得 dp 数组中的最大值即可
  const dp = new Array(len1 + 1).fill(0).map(() => new Array(len2 + 1).fill(0))
  let max = 0
  for (let i = 0; i < len1; i++) {
    for (let j = 0; j < len2; j++) {
      if (s1[i] === s2[j]) {
        dp[i + 1][j + 1] = dp[i][j] + 1
        // 同时记录不最大结果
        max = Math.max(dp[i + 1][j + 1], max)
      }
    }
  }

  return max
}

console.log(findLongestCommonSUbString('asdfas', 'werasdfaswer'))
