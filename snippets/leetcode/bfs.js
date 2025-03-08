/**
 * 问题的本质就是让你在一幅「图」中找到从起点 start 到终点 target 的最近距离，
 * 这个例子听起来很枯燥，但是 BFS 算法问题其实都是在干这个事儿.
 */

function bfs() {
  // 一般来说，bfs 有一个核心数据结构 queue 队列，用于存放后面将要访问的节点
  // 若存在可能会走回头路的情况，可能还需要一个额外的 set 来存储已经走过的节点，防止无限循环
  // 对于图来说，这个 set 是必须的，对于二叉树这种没有子节点到父节点的指针的，不会走回头路，也就不需要这个 set
}

function BinaryTreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

/**
 * 二叉数最小深度
 * @param {BinaryTreeNode} tree
 */
function binaryTreeMinDepth(tree) {
  if (!tree) {
    return 0
  }

  const queue = []
  // // 二叉树不会走回头路，下面的 set 是不必要的
  // const visited = new Set()
  queue.push(tree)
  let depth = 1
  while (queue.length > 0) {
    const size = queue.length
    for (let i = 0; i < size; i++) {
      const node = queue.shift()
      if (!node.left && !node.right) {
        return depth
      }
      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
    }

    depth++
  }

  return depth
}

/**
 * bfs 开锁
 * @param {string[]} deadends
 * @param {string} target
 * @param {string} from
 */
function openLock(deadends, target, from = '0000') {
  const queue = []
  const visited = new Set()
  deadends.forEach((s) => visited.add(s))
  queue.push(from)
  const targetSize = target.length

  if (visited.has(from)) {
    return -1
  }

  if (target === from) {
    return 0
  }

  let step = 0
  while (queue.length > 0) {
    step++
    const size = queue.length
    for (let i = 0; i < size; i++) {
      const current = queue.shift()
      for (let j = 0; j < targetSize; j++) {
        const upAndDown = pushUpAndDown(current, j)
        for (const item of upAndDown) {
          if (item === target) {
            return step
          }
          if (!visited.has(item)) {
            visited.add(item)
            queue.push(item)
          }
        }
        visited.add(current)
      }
    }
  }

  return -1

  /**
   * @param {string} str
   * @param {number} index
   * @returns
   */
  function pushUpAndDown(str, index) {
    const n = Number(str[index])
    const up = (n + 1) % 10
    const down = (n - 1 + 10) % 10
    const prefix = str.slice(0, index)
    const suffix = str.slice(index + 1)
    const str1 = prefix + up + suffix
    const str2 = prefix + down + suffix
    return [str1, str2]
  }
}

console.log(openLock(['8887', '8889', '8878', '8898', '8788', '8988', '7888', '9888'], '8888'))
console.log(openLock(['8888'], '0009'))
