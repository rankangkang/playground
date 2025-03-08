/**
 * 你有一个带有四个圆形拨轮的转盘锁。每个拨轮都有10个数字： '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' 。每个拨轮可以自由旋转：例如把 '9' 变为 '0'，'0' 变为 '9' 。每次旋转都只能旋转一个拨轮的一位数字。
 * 锁的初始数字为 '0000' ，一个代表四个拨轮的数字的字符串。
 * 列表 deadends 包含了一组死亡数字，一旦拨轮的数字和列表里的任何一个元素相同，这个锁将会被永久锁定，无法再被旋转。
 * 字符串 target 代表可以解锁的数字，你需要给出解锁需要的最小旋转次数，如果无论如何不能解锁，返回 -1 。
 */

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
