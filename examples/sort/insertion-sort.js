function insertionSort(arr) {
  let len = arr.length
  let preIdx, current
  for (let i = 1; i < len; i++) {
    preIdx = i - 1
    current = arr[i]
    while (preIdx >= 0 && arr[preIdx] > current) {
      arr[preIdx + 1] = arr[preIdx]
      preIdx--
    }
    arr[preIdx + 1] = current;
  }

  return arr;
}

// let arr = [3, 6, 2, 4, 7, 9, 10, 22]
const arr = new Array(1000).fill(0).map(() => {
  return Math.ceil(Math.random() * 1000)
})
console.time('insertion-sort')
insertionSort(arr)
console.timeEnd('insertion-sort')
console.log(arr)