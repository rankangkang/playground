class TreeNode {
  val
  /** @typedef {TreeNode} */
  left
  /** @typedef {TreeNode} */
  right
}


/**
 * 二叉树层级遍历
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  const q = []
  const result = []
  // 根节点入队
  if (root) {
    q.push(root)
  }
  while (q.length !== 0) {
    const nextQ = [] // 临时队列，记录下一层级节点
    const levelR = [] // 临时结果，记录一个层级的遍历结果

    // 清空队列：遍历一个层级的所有节点
    while (q.length !== 0) {
      const node = q.shift()
      levelR.push(node.val)
      if (node.left) {
        nextQ.push(node.left)
      }
      if (node.right) {
        nextQ.push(node.right)
      }
    }

    q.push(...nextQ)
    result.push(levelR)
  }

  return result
};

/**
 * 二叉树层级遍历2
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder2 = function (root) {
  if (!root) {
    return []
  }
  const q = []
  const result = []
  // 根节点入队
  q.push(root)
  let nextQ = [] // 临时队列，记录下一层级节点
  let levelR = [] // 临时结果，记录一个层级的遍历结果
  while (q.length !== 0) {
    // 清空队列：遍历一个层级的所有节点
    const node = q.shift()
    levelR.push(node.val)
    if (node.left) {
      nextQ.push(node.left)
    }
    if (node.right) {
      nextQ.push(node.right)
    }

    if (q.length === 0) {
      q.push(...nextQ)
      result.push(levelR)
      nextQ = []
      levelR = []
    }
  }

  return result
};

var levelOrder3 = function (root) {
  if (!root) {
    return []
  }
  const q = []
  const result = []
  // 根节点入队
  q.push(root)
  while (q.length !== 0) {
    // 清空队列：遍历一个层级的所有节点
    let len = q.length
    for (let i = 0; i < len; i++) {
      const node = q[i]
      if (node.left) {
        q.push(node.left)
      }
      if (node.right) {
        q.push(node.right)
      }
    }

    const popNodes = q.splice(0, len)
    const value = popNodes.map(item => item.val)
    result.push(value)
  }

  return result
}
