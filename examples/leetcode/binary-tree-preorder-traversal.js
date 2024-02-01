/**
 * @typedef {{
 *  val?: string | number
 *  left?: TreeNode
 *  right?: TreeNode
 * }} TreeNode
 */

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  const result = []
  traversal(root)
  return result

  /**
   * @param {TreeNode} node 
   * @returns 
   */
  function traversal(node) {
    if (!node) {
      return
    }
    result.push(node.val)
    traversal(node.left)
    traversal(node.right)
  }
};

/**
 * 迭代方式前序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal2 = function (root) {
  let result = []
  let stack = []

  let node = root
  while (node || stack.length > 0) {
    while (node) {
      // 前序，现插入根
      result.push(node.val)
      // 将根压入栈
      stack.push(node)
      // 继续遍历下一级
      node = node.left
    }

    // 出栈，遍历其右子节点
    node = stack.pop().right
  }

  return result
}