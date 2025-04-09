/**
 * tag: 中等
 * 递归 + 分治
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

/**
 * 分治法，将左右子链表合并
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
let flatten = function (root) {
  if (!root) {
    return null
  }

  const leftTail = flatten(root.left)
  const rightTail = flatten(root.right)
  if (leftTail) {
    // 将 left 插到 root 和 right 之间
    leftTail.right = root.right
    root.right = root.left
    root.left = null
  }

  return rightTail ?? leftTail ?? root
}
