/**
 * 深度优先
 * @param {string} s
 * @return {string[]}
 */
let restoreIpAddresses = function (s) {
  let res = []
  dfs([], 0)
  return res

  /**
   * @param {string[]} subRes
   * @param {number} start
   */
  function dfs(subRes, start) {
    if (subRes.length === 4 && start === s.length) {
      // 集齐长度，同时所有数字已被考察完全
      res.push(subRes.join('.'))
      return
    }

    if (subRes.length === 4 && start < s.length) {
      // 已近有 4 段，但字符未耗尽，不符合要求，剪枝
      return
    }

    for (let len = 1; len <= 3; len++) {
      if (start + len - 1 >= s.length) {
        // 越界，剪枝
        return
      }
      if (len !== 1 && s[start] === '0') {
        // 不能有前导 0，剪枝
        return
      }

      const str = s.slice(start, start + len)
      if (len === 3 && Number(str) > 255) {
        // 大于 255，剪枝
        return
      }

      subRes.push(str)
      dfs(subRes, start + len)

      // 上一个递归分支结束，撤销最后的选择，进入下一轮迭代，考察下一个切割长度
      subRes.pop()
    }
  }
}

console.log(restoreIpAddresses('25525511135'))
