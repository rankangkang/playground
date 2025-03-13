/**
 * 二叉树的 直径 是指树中任意两个节点之间最长路径的 长度 。这条路径可能经过也可能不经过根节点 root 。
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
 * @return {number}
 */
let diameterOfBinaryTree = function (root) {
  let res = 0

  // 遍历节点
  function traverse(root) {
    if (!root) {
      return 0
    }

    const left = traverse(root.left)
    const right = traverse(root.right)

    // 计算经过该节点的直径，与已存储的结果对比，取最大值
    res = Math.max(res, left + right)

    // 返回节点为根的树的最大深度
    return Math.max(left, right) + 1
  }

  traverse(root)
  return res
}
