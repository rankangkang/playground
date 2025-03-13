/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
let lowestCommonAncestor = function (root, p, q) {
  if (root === p || root === q || !root) {
    return root
  }

  // 找到 p 或 q 就回返回，对于最近的祖先节点，p、q 一定在其不同的子树上。

  // 找右边
  const left = lowestCommonAncestor(root.left, p, q)
  // 找左边
  const right = lowestCommonAncestor(root.right, p, q)

  // 递归条件在后，即先从叶子结点开始，找到的值向上传递
  if (left && right) {
    return root
  }

  return left || right
}
