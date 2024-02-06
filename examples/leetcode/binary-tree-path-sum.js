class TreeNode {
  val
  /** @typedef {TreeNode} */
  left
  /** @typedef {TreeNode} */
  right
}

/**
 * 是否存在指定的二叉树路径（根节点到叶子节点）和
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
  return pathSum(root)

  function pathSum(node, currentSum = 0) {
    if (!node) {
      return false
    }

    const nextSum = currentSum + node.val
    if (isLeaf(node)) {      
      return nextSum === targetSum
    }

    // 不可可以为0或复数时，则取消注释下面的代码
    // if (nextSum >= targetSum) {
    //   return false
    // }

    return pathSum(node.left, nextSum) || pathSum(node.right, nextSum)
  }

  function isLeaf(node) {
    return node && !node.left && !node.right
  }
};