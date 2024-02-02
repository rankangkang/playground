/**
 * 冒泡排序
 * 实现原理：相邻位置的数据两两比较，较大的数据向右冒泡；每轮冒泡区间，最大的元素将会冒泡至区间尾部。
 * @param {number[]} arr 
 * @param {*} len 
 */
function bubbleSort(arr, len) {
  len = len || arr.length
  for (let end = len - 1; end >= 0; end--) {
    // 第一轮，最大的元素会冒泡至最尾部
    // 第二轮，次大的元素冒泡至次尾部
    // 以此类推
    for (let start = 0; start < end; start++) {
      if (arr[start] > arr[start + 1]) { // 相邻位置，较大的元素向右冒泡
        const tmp = arr[start + 1]
        arr[start + 1] = arr[start]
        arr[start] = tmp
      }
    }
  }

  return arr
}

const arr = new Array(1000).fill(0).map(() => {
  return Math.ceil(Math.random() * 1000)
})
console.time('bubble-sort')
bubbleSort(arr)
console.timeEnd('bubble-sort')
console.log(arr)
