/**
 * tag: 中等
 * https://leetcode.cn/problems/palindromic-substrings/description/
 * 数回文子串
 */

/**
 * 与最长回文子串解法类似，选定一个信标然后向双端扩张
 * @param {string} s
 * @return {number}
 */
let countSubstrings = function (s) {
  let res = 0

  function expand(start, end = start) {
    // 这里只是 count
    // let res = []
    let count = 0
    while (s[start] === s[end] && start >= 0 && end < s.length) {
      // res.push(s.slice(start, end + 1))
      count++
      start--
      end++
    }

    return count
  }

  for (let i = 0; i < s.length; i++) {
    res = res + expand(i) + expand(i, i + 1)
  }

  return res
}

console.log(countSubstrings('abc'))
console.log(countSubstrings('aaa'))
