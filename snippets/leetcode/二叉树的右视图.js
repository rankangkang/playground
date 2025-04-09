/**
 * tag: 中等
 */
/**
 * 广度优先层序遍历，记录每个层级的最后一个元素
 * @param {*} root
 * @returns
 */
let rightSideView = function (root) {
  if (!root) {
    return []
  }

  const memo = []
  const queue = [root]
  while (queue.length) {
    // 每一个层级的数量
    const size = queue.length
    let i = 0
    while (i < size) {
      const node = queue.shift()
      // 记录该层级最后一个元素
      if (i === size - 1) {
        memo.push(node.val)
      }
      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
      i++
    }
  }

  return memo
}
