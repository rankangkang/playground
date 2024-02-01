/**
 * 快排原理：选定一个信标（通常为首位或末位），将大于信标的元素放到右边，小于信标的元素放到左边，然后分别对两边进行快排
 */

var QuickSort = function () { }

/**
 * 快速排序，非原地
 * @param {number[]} arr 
 * @returns 
 */
QuickSort.prototype.nonInPlace = function (arr) {
  const len = arr.length
  if (arr.length === 0) {
    return []
  }

  let left = []
  let right = []
  const pivot = arr[len - 1]
  for (let i = 0; i < len - 1; i++) {
    if (arr[i] <= pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  let leftResult = this.nonInPlace(left)
  let rightResult = this.nonInPlace(right)
  return leftResult.concat(pivot, ...rightResult)
}

/**
 * 原地排序
 * @param {number[]} arr 
 * @param {number} l 
 * @param {number} r 
 */
QuickSort.prototype.inPlace = function (arr, l, r) {
  l = l || 0
  r = r || arr.length
  if (l < r - 1) {
    let pi = QuickSort.divide(arr, l, r)
    this.inPlace(arr, l, pi)
    this.inPlace(arr, pi + 1, r)
  }

  return arr
}

/**
 * 拆分数组：将小于信标的放左边，大于信标的放右边
 * 返回信标坐标
 * @param {number[]} arr 
 * @param {number} l 
 * @param {number} r 
 * @returns 
 */
QuickSort.divide = function (arr, l, r) {
  function swap(arr, i, j) {
    let tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }

  const pivot = arr[r - 1]
  let i = l - 1
  let j = l
  while (j < r - 1) {
    if (arr[j] <= pivot) {
      i++
      swap(arr, i, j)
    }

    j++
  }
  
  swap(arr, i + 1, r - 1)

  return i + 1
}

const quickSort = new QuickSort()

const arr = new Array(1000).fill(0).map(() => {
  return Math.ceil(Math.random() * 100)
})
console.time('quick-sort non-in-place')
let sorted = quickSort.nonInPlace(arr)
console.timeEnd('quick-sort non-in-place')
console.log(sorted)

console.time('quick-sort in-place')
quickSort.inPlace(arr)
console.timeEnd('quick-sort in-place')
console.log(arr)
