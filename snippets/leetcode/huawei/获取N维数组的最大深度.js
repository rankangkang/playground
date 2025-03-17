/**
 *
 * @param {number[]} arr
 * @param {number} r
 */
function findMaxDepth(arr) {
  if (!arr) {
    return 0
  }

  let depths = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] instanceof Array) {
      depths.push(findMaxDepth(arr[i]) + 1)
    } else {
      depths.push(1)
    }
  }

  return Math.max(...depths)
}

console.log(
  findMaxDepth([[1], [2, 3, 4], [5, [2, 3]], [7], [0, [1, 2, 3, 4], 3, 5], [1, 3], [3, 2, 4]]),
)

/**
 *
 * @param {number[]} arr
 */
function findMaxDepthWithQueue(arr) {
  if (!arr) {
    return 0
  }

  let depth = 0
  const queue = [...arr]
  while (queue.length > 0) {
    const len = queue.length
    for (let i = 0; i < len; i++) {
      const target = queue.shift()
      if (target instanceof Array) {
        queue.push(...target)
      }
    }

    depth++
  }

  return depth
}

console.log(
  findMaxDepthWithQueue([
    [1],
    [2, 3, 4],
    [5, [2, 3]],
    [7],
    [0, [1, 2, 3, 4], 3, 5],
    [1, 3],
    [3, 2, 4],
  ]),
)

function findMaxDepthStr(str) {
  let maxDepth = 0
  const stack = []
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '[') {
      stack.push('[')
      maxDepth = Math.max(stack.length, maxDepth)
    } else if (str[i] === ']') {
      stack.pop()
    }
  }

  return maxDepth
}

console.log(
  findMaxDepthStr('[[1], [2, 3, 4], [5, [2, 3]], [7], [0, [1, 2, 3, 4], 3, 5], [1, 3], [3, 2, 4]]'),
)
