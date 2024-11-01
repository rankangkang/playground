class BTNode {
  /** @private */
  _left
  /** @private */
  _right

  value

  constructor(value) {
    this.value = value
  }

  set left(node) {
    if (!node || node instanceof BTNode) {
      this._left = node
    }
  }

  set right(node) {
    if (!node || node instanceof BTNode) {
      this._right = node
    }
  }

  /**
   * @returns {BTNode}
   */
  get left() {
    return this._left
  }

  /**
   * @returns {BTNode}
   */
  get right() {
    return this._right
  }

  toString() {
    const leftString = this.left ? this.left.toString() : undefined
    const rightString = this.right ? this.right.toString() : undefined
    const childStr = [leftString, rightString].filter((item) => !!item).join(', ')
    const childValue = childStr ? `, [${childStr}]` : ''
    return `[${this.value}${childValue}]`
  }
}

function createBtree(value, left, right) {
  const btree = new BTNode(value)

  if (typeof left !== 'undefined') {
    btree.left = new BTNode(left)
  }

  if (typeof right !== 'undefined') {
    btree.right = new BTNode(right)
  }

  return btree
}

const btree = createBtree(0, 1, 2)

btree.left.left = createBtree(3, 4, 5)
btree.left.right = createBtree(6, 7)

btree.right.left = createBtree(8, 9, 10)
btree.right.right = createBtree(11)

console.log(btree.toString())

/**
 * 前序遍历
 * @param {BTNode} btree
 * @returns {Array<any>}
 */
function preorderTraversal(btree) {
  const result = []

  /**
   *
   * @param {BTNode} bt
   */
  const traverse = (bt) => {
    result.push(bt.value)
    if (bt.left) {
      traverse(bt.left)
    }
    if (bt.right) {
      traverse(bt.right)
    }
  }

  traverse(btree)

  return result
}

/**
 * 中序遍历
 * @param {BTNode} btree
 * @returns {Array<any>}
 */
function inorderTraversal(btree) {
  const result = []

  /**
   *
   * @param {BTNode} bt
   */
  const traverse = (bt) => {
    if (bt.left) {
      traverse(bt.left)
    }
    result.push(bt.value)
    if (bt.right) {
      traverse(bt.right)
    }
  }

  traverse(btree)

  return result
}

/**
 * 后遍历
 * @param {BTNode} btree
 * @returns {Array<any>}
 */
function postorderTraversal(btree) {
  const result = []

  /**
   *
   * @param {BTNode} bt
   */
  const traverse = (bt) => {
    if (bt.left) {
      traverse(bt.left)
    }
    if (bt.right) {
      traverse(bt.right)
    }
    result.push(bt.value)
  }

  traverse(btree)

  return result
}

// 二叉树前序、中序、后续遍历的“顺序”通常来说指的是根节点的相对于子节点的顺序
// 根节点先于所有子节点访问为前序，在左右节点之间访问为中序，在所有子节点之后访问为后序
console.log('preorder', preorderTraversal(btree))
console.log('inorder', inorderTraversal(btree))
console.log('postorder', postorderTraversal(btree))
