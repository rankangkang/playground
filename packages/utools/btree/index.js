/**
 * @type {import('.').default}
 */
module.exports.TreeNode = class TreeNode {
  val
  left
  right

  constructor(value, left = null, right = null) {
    this.val = value
    this.left = left
    this.right = right
  }

  static from(array) {
    const len = array.length
    if (!len || array[0] === null) {
      return null
    }

    const root = new TreeNode(array[0])
    const queue = [root]
    let i = 0
    while (queue.length) {
      const node = queue.shift()
      const left = 2 * i + 1
      if (left < len && array[left] !== null) {
        node.left = new TreeNode(array[left])
        queue.push(node.left)
      }

      const right = 2 * i + 2
      if (right < len && array[right] !== null) {
        node.right = new TreeNode(array[right])
        queue.push(node.right)
      }

      i++
    }

    return root
  }
}
