// 给定一个非空字符串S，其被N个‘-’分隔成N+1的子串，给定正整数K，要求除第一个子串外，其余的子串每K个字符组成新的子串，并用‘-’分隔。对于新组成的每一个子串，如果它含有的小写字母比大写字母多，则将这个子串的所有大写字母转换为小写字母；反之，如果它含有的大写字母比小写字母多，则将这个子串的所有小写字母转换为大写字母；大小写字母的数量相等时，不做转换。

/**
 * 给定一个非空字符串S，其被N个‘-’分隔成N+1的子串，给定正整数K，要求除第一个子串外，其余的子串每K个字符组成新的子串，并用‘-’分隔。对于新组成的每一个子串，如果它含有的小写字母比大写字母多，则将这个子串的所有大写字母转换为小写字母；反之，如果它含有的大写字母比小写字母多，则将这个子串的所有小写字母转换为大写字母；大小写字母的数量相等时，不做转换。
 * 解法：分别计算子串的大小写个数，并确定大写或小写
 * @param {number} k
 * @param {string} s
 * @returns {string}
 */
function solution(k, s) {
  const ss = s.split('-')
  let result = ss[0]
  const str = ss.slice(1).join('')

  const len = Math.ceil(str.length / k) * k
  let idx = 0
  while (idx < len) {
    let target = str.substring(idx, idx + 3)
    let upper = 0
    let lower = 0
    // 分别计算子串大小写长度
    for (let j = 0; j < target.length; j++) {
      if (target[j] >= 'A' && target[j] <= 'Z') {
        upper += 1
      } else if (target[j] >= 'a' && target[j] <= 'z') {
        lower += 1
      }
    }

    if (upper > lower) {
      target = target.toUpperCase()
    } else if (upper < lower) {
      target = target.toLowerCase()
    }

    result = `${result}-${target}`
    idx += 3
  }

  return result
}

console.log(solution(3, '12abc-abCABc-4aB@')) // 12abc-abc-ABC-4aB-@
