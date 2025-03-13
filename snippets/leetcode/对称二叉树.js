/**
 * tag: 简单
 * 判断二叉树是否中心轴对称
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
let isSymmetric = function (root) {
  return compare(root.left, root.right)
}

function compare(left, right) {
  if (!left && !right) {
    return true
  }

  if (!left || !right) {
    return false
  }

  const isValEqual = left.val === right.val
  return isValEqual && compare(left.left, right.right) && compare(left.right, right.left)
}
