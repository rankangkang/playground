/**
 * tag: 中等
 * 使用区间比较的方式
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
let isValidBST = function (root, left = -Infinity, right = Infinity) {
  if (!root) {
    return true
  }

  const val = root.val
  return (
    val > left &&
    val < right &&
    isValidBST(root.left, left, val) &&
    isValidBST(root.right, val, right)
  )
}
