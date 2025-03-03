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
  const r = []
  // 采用队列层次遍历
  const queue = [root]

  while (queue.length > 0) {
    const levelSize = queue.length;
    const levelItem = []
    for (let i = 0; i < levelSize; i++) {
      const target = queue.shift()
      levelItem.push(target.val)

      if (target.left) {
        queue.push(target.left)
      }
      if (target.right) {
        queue.push(target.right)
      }
    }
    r.push(levelItem)
  }

  return r;
};
