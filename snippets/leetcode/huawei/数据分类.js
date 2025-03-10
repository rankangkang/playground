/**
 * 对一个数据a进行分类，分类方法是，此数据a(4个字节大小)的4个字节相加对一个给定值b取模，如果得到的结果小于一个给定的值c则数据a为有效类型，其类型为取模的值。如果得到的结果大于或者等于c则数据a为无效类型。
 * 请找到有效类型中包含数据最多的类型，并输出该类型含有多少个数据
 * @param {number} c
 * @param {number} b
 * @param  {...number} as
 * @returns
 */
function solution(c, b, ...as) {
  // 输出结果
  const len = as.length

  let idx = 0
  const result = {}
  while (idx < len) {
    const a = as[idx]
    // 每一个字节为 8 位，每一个直接值为该字节与 0xff 与运算
    // 8 位最大值 1111 1111，即 0xff
    const a1 = (a >> 24) & 0xff
    const a2 = (a >> 16) & 0xff
    const a3 = (a >> 8) & 0xff
    const a4 = a & 0xff
    const t = (a1 + a2 + a3 + a4) % b
    if (t < c) {
      if (!result[t]) {
        result[t] = 0
      }
      result[t] += 1
    }
    idx++
  }

  let maxCount = 0
  let maxKey = ''
  Object.entries(result).forEach(([key, count]) => {
    if (count > maxCount) {
      maxKey = key
      maxCount = count
    }
  })

  console.log(maxCount)
  return maxCount
}

solution(3, 4, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265)
