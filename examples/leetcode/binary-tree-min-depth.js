/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

class TreeNode {
  val
  /** @typedef {TreeNode} */
  left
  /** @typedef {TreeNode} */
  right
}

/**
 * 与最大深度相反，排除根节点没有叶子节点的情况
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
  if (root === null) {
    return 0
  }

  if (root.left && root.right) {
    return 1 + Math.min(minDepth(root.left), minDepth(root.right))
  }

  return 1 + minDepth(root.left || root.right)
};

// TODO: 解法二，遇到叶子节点就返回
