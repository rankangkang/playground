/**
 * 找出两个正序数组合并之后的中位数
 * 先排序，后计算
 * @param {number[]} numsl 
 * @param {number[]} numsr 
 */
var findSortedArraysMedian = function(numsl, numsr) {
  let li = 0, ri = 0
  const arr = []
  while(li < numsl.length && ri < numsr.length) {
    if (numsl[li] < numsr[ri]) {
      arr.push(numsl[li])
      li++
    } else {
      arr.push(numsr[ri])
      ri++
    }
  }

  if (li < numsl.length) {
    arr.push(...numsl.slice(li))
  }
  if (ri < numsr.length) {
    arr.push(...numsr.slice(ri))
  }

  let mid = Math.floor(arr.length / 2)
  if (arr.length % 2 === 1) {
    return arr[mid]
  }

  return (arr[mid] + arr[mid - 1]) / 2
}

console.log(findSortedArraysMedian([1,2,3,4], [5,6,7,8]))
console.log(findSortedArraysMedian([1,2,3], [5,6,7,8]))
