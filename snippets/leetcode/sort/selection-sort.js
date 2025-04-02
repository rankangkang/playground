/**
 * 选择排序
 * 分为有序区与无序区，从无序区选择一个最小的元素插入有序区尾部（即将无序区最小位置与无序区首位交换位置）
 * @param {number[]} arr
 * @param {number} len
 */
function selectionSort(arr, len) {
  len = len || arr.length
  for (let i = 0; i < len; i++) {
    // 找出无序区最小值下标
    let minIdx = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j
      }
    }

    // 交换位置 i 与位置 minIdx 位置的值
    const tmp = arr[minIdx]
    arr[minIdx] = arr[i]
    arr[i] = tmp
  }

  return arr
}

const arr = new Array(1000).fill(0).map(() => {
  return Math.ceil(Math.random() * 1000)
})
console.time('selection-sort')
selectionSort(arr)
console.timeEnd('selection-sort')
console.log(arr)
