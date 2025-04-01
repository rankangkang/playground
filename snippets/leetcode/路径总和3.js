const { TreeNode } = require('@pg/btree')

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
let pathSum = function (root, targetSum) {
  function find(node, sum, isSub = false) {
    if (!node) {
      return 0
    }

    if (node.val === sum) {
      return 1
    }

    const nextSum = sum - node.val
    if (isSub) {
      return find(node.left, nextSum, true) + find(node.right, nextSum, true)
    }

    return (
      find(node.left, nextSum, true) +
      find(node.right, nextSum, true) + // 子树 + 子和
      find(node.left, targetSum) +
      find(node.right, targetSum)
    ) // 子树
  }

  return find(root, targetSum)
}

const t1 = TreeNode.from([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1])
const t2 = TreeNode.from([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1])
const t3 = TreeNode.from([1, -2, -3, 1, 3, -2, null, -1])

console.log(pathSum(t1, 8))
console.log(pathSum(t2, 22))
console.log(t3)
