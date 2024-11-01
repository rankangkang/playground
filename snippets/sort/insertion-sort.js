/**
 * 插入排序
 * 实现原理：数组分为有序区（左）与无序区（右），从无序区选择第一个插入有序区
 * 稳定与否：稳定
 * @param {number[]} arr
 * @param {*} len
 */
function insertionSort(arr, len) {
  len = len || arr.length
  for (let i = 1; i < len; i++) {
    // 排序目标 target：选择无序区的第一个，下标为 i
    let target = arr[i]
    // 有序区的最后一个元素，下标为 j = i - 1
    let j = i - 1
    while (j >= 0 && arr[j] > target) {
      // 给 target 腾出位置：比 target 大的往右挪
      arr[j + 1] = arr[j]
      j--
    }
    // 此时，j = -1 （即首部，意味着 target 是最小的）或 arr[j] <= target（target 大于下标为 j 的元素）
    // 则 target 的位置应为 j + 1
    arr[j + 1] = target
  }

  return arr
}

// let arr = [3, 6, 2, 4, 7, 9, 10, 22]
const arr = new Array(1000).fill(0).map(() => {
  return Math.ceil(Math.random() * 1000)
})
console.time('insertion-sort')
insertionSort(arr)
console.timeEnd('insertion-sort')
console.log(arr)
