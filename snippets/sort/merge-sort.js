/**
 * 归并排序
 * 实现原理：将数组二分（每个部分分别进行归并排序：将两个有序数组合并为一个有序数组）后进行归并
 * @param {number[]} arr
 * @param {number} ll
 * @param {number} rr
 */
function mergeSort(arr, ll, rr) {
  ll = ll || 0
  rr = rr || arr.length
  if (rr - ll <= 1) {
    return arr.slice(ll, rr)
  }

  const mid = Math.floor((ll + rr) / 2)
  // 分别进行归并
  const la = mergeSort(arr, ll, mid)
  const ra = mergeSort(arr, mid, rr)
  // 合并
  return mergeSort.merge(la, ra)
}

/**
 * 归并两个数组，返回一个数组 c
 * @param {number[]} a
 * @param {number[]} b
 */
mergeSort.merge = function (a, b) {
  let i = 0
  let j = 0
  const c = []
  while (i < a.length && j < b.length) {
    if (b[j] < a[i]) {
      c.push(b[j])
      j++
    } else {
      c.push(a[i])
      i++
    }
  }

  if (i < a.length) {
    c.push(...a.slice(i))
  }
  if (j < b.length) {
    c.push(...b.slice(j))
  }

  return c
}

// const arr = [3, 6, 2, 4, 7, 9, 10, 22]
const arr = new Array(1000).fill(0).map(() => {
  return Math.ceil(Math.random() * 1000)
})
console.time('merge-sort')
const sorted = mergeSort(arr)
console.timeEnd('merge-sort')
console.log(sorted)
