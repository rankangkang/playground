/**
 * 全排列
 * @param {string[] | number[]} arr 
 * @param {number} index
 */
function solution(arr, index = 0) {
  if (index === arr.length - 1) {
    return [[...arr]]
  }

  const res = []
  for (let i = index; i < arr.length; i++) {
    [arr[index], arr[i]] = [arr[i], arr[index]]
    res.push(...solution(arr, index+1))
    ;[arr[index], arr[i]] = [arr[i], arr[index]]
  }

  return res
}

console.log(solution([1,2,3,4]))

/**
 * 递归
 * n 个元素的全排列 = 一个元素 + 其他n-1个元素的全排列
 * ...
 * 四个元素的全排列 = 一个元素 + 其他三元素的全排列         4 * 6 = 24
 * 三个元素的全排列 = 一个元素 + 其他两个元素的全排列        3 * 2 = 6
 * 二个元素的全排列 = 一个元素 + 其他一个元素的全排列        2 * 1 = 2
 * @param {any[]} arr 
 * @returns 
 */
function solution2(arr) {
  let res = []
  if (arr.length === 1) {
    res.push(arr.slice())
    return res
  }

  for (let i = 0; i < arr.length; i++) {
    const first = arr[i]
    const rest = arr.slice(0, i).concat(arr.slice(i + 1))
    const restRes = solution2(rest)
    res.push(...restRes.map(item => ([first, ...item])))
  }

  return res
}

console.log(solution2([1,2,3,4]))
