// 堆是一个完全二叉树
// 大根堆：根节点大于所有子节点；小根堆：根节点小于所有子节点

function heapSort(arr) {
  // 从最后一个非叶子节点开始，依次向上调整堆
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, arr.length, i)
  }

  // 从最后一个元素开始，依次与堆顶元素（最大根）交换并调整堆
  for (let i = arr.length - 1; i > 0; i--) {
    // 将堆顶元素与当前元素交换
    ;[arr[0], arr[i]] = [arr[i], arr[0]]
    // 调整堆，只考虑前 i 个元素
    heapify(arr, i, 0)
  }

  return arr
}

// 将以 i 为根节点的子树调整为大根堆
function heapify(arr, n, i) {
  let largest = i // 将当前节点标记为最大值
  const left = 2 * i + 1 // 左子节点
  const right = 2 * i + 2 // 右子节点

  // 如果左子节点大于根节点，则标记左子节点为最大值
  if (left < n && arr[left] > arr[largest]) {
    largest = left
  }

  // 如果右子节点大于最大值，则标记右子节点为最大值
  if (right < n && arr[right] > arr[largest]) {
    largest = right
  }

  // 如果最大值不是根节点，则交换根节点与最大值，并递归调整被交换的子树
  if (largest !== i) {
    ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
    heapify(arr, n, largest)
  }
}

const arr = new Array(1000).fill(0).map(() => {
  return Math.ceil(Math.random() * 1000)
})
console.time('heap-sort')
heapSort(arr)
console.timeEnd('heap-sort')
console.log(arr)
