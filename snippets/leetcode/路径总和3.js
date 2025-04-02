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

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
function pathSum2(root, targetSum) {
  let ans = 0
  // 前缀和，当前节点到根节点的前缀和
  const countMap = new Map()
  countMap.set(0, 1)

  /**
   *
   * @param {TreeNode} node
   * @param {number} s
   */
  function dfs(node, s) {
    if (!node) {
      return
    }

    s += node.val
    ans += countMap.get(s - targetSum) ?? 0

    // 根到当前节点的前缀和
    countMap.set(s, (countMap.get(s) ?? 0) + 1)
    dfs(node.left, s)
    dfs(node.right, s)

    // 恢复现场
    countMap.set(s, countMap.get(s) - 1)
  }

  dfs(root, 0)

  return ans
}

const t1 = TreeNode.from([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1])
const t2 = TreeNode.from([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1])
const t3 = TreeNode.from([1, -2, -3, 1, 3, -2, null, -1])

console.log(pathSum2(t1, 8))
console.log(pathSum2(t2, 22))
console.log(pathSum2(t3, 1))
