/**
 * 冒泡排序
 * @param {number[]} arr
 */
function bubbleSort(arr) {
  for (let i = arr.length; i > 0; i--) {
    // 每冒泡一次，最大值会冒泡至最右边
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
}

const arr = new Array(100).fill(0).map(() => {
  return Math.ceil(Math.random() * 1000)
})
console.time('bubble-sort')
bubbleSort(arr)
console.timeEnd('bubble-sort')
console.log(arr)

/**
 * 快速排序
 * @param {*} arr
 * @returns
 */
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr
  }

  const pivot = arr[0]

  const left = []
  const right = []
  arr.slice(1).forEach((n) => {
    if (n > pivot) {
      right.push(pivot)
    } else {
      left.push(pivot)
    }
  })

  return [...quickSort(left), pivot, ...quickSort(right)]
}

const arr2 = new Array(100).fill(0).map(() => {
  return Math.ceil(Math.random() * 1000)
})
console.time('quick-sort')
bubbleSort(arr2)
console.timeEnd('quick-sort')
console.log(arr2)
