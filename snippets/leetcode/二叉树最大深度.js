class TreeNode {
  val
  /** @typedef {TreeNode} */
  left
  /** @typedef {TreeNode} */
  right
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
let maxDepth = function (root) {
  if (root == null) {
    return 0
  }

  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
}
