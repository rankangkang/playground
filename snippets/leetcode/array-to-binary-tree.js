class TreeNode {
  val
  /** @typedef {TreeNode} */
  left
  /** @typedef {TreeNode} */
  right

  constructor(val) {
    this.val = val
  }
}

/**
 *
 * @param {any[]} arr
 */
function array2bst(arr) {
  if (arr.length === 0) {
    return null
  }

  const root = new TreeNode(arr[0])
  const queue = [root]
  let i = 1
  while (i < arr.length) {
    const node = queue.shift()
    // 左节点
    if (i < arr.length && arr[i] !== null) {
      node.left = new TreeNode(arr[i])
      queue.push(node.left)
    }
    i++

    // 右节点
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i])
      queue.push(node.right)
    }
    i++
  }

  return root
}

/**
 * 二叉树转数组
 * @param {TreeNode} root
 */
function bst2array(root) {
  const result = []
  const queue = [root]

  while (queue.length !== 0) {
    const node = queue.shift()
    if (!node) {
      result.push(null)
      continue
    }

    result.push(node.val)
    if (node.left || node.right) {
      queue.push(node.left || null)
      queue.push(node.right || null)
    }
  }

  // 移除尾部的 null
  let tail = result[result.length - 1]
  while (!tail) {
    result.pop()
    tail = result[result.length - 1]
  }

  return result
}

const arrObj = [1, 2, 3, null, 4, 5, null, 7, 8, 9]
const bst = array2bst(arrObj)
const arr = bst2array(bst)
console.log(JSON.stringify(bst, null, '  '))
console.log(arr)
