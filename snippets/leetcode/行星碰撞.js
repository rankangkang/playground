/**
 * 暴力模拟
 * @param {number[]} asteroids
 * @return {number[]}
 */
let asteroidCollision = function (asteroids) {
  const check = () => {
    for (let i = 0; i < asteroids.length - 1; i++) {
      const curr = asteroids[i]
      const next = asteroids[i + 1]
      if (curr > 0 && next < 0) {
        const absCurr = Math.abs(curr)
        const absNext = Math.abs(next)
        if (absCurr === absNext) {
          return { start: i, count: 2 }
        } else if (absCurr < absNext) {
          return { start: i, count: 1 }
        } else {
          return { start: i + 1, count: 1 }
        }
      }
    }

    return undefined
  }

  let toSplice = check()
  while (toSplice) {
    asteroids.splice(toSplice.start, toSplice.count)
    toSplice = check()
  }

  return asteroids
}

console.log(asteroidCollision([10, 2, -5]))

/**
 * 使用 stack 模拟，出入栈时进行操作
 * @param {number[]} asteroids
 * @returns
 */
let asteroidCollision2 = function (asteroids) {
  const stack = []
  for (let i = 0; i < asteroids.length; i++) {
    let curr = asteroids[i]
    while (stack.length && stack.at(-1) > 0 && curr < 0) {
      const prev = stack.pop()
      const absCurr = Math.abs(curr)
      if (prev > absCurr) {
        // 当前行星爆炸，保留前一个
        curr = prev
      } else if (prev < absCurr) {
        // 前一个行星爆炸，保留当前
        curr = curr
      } else {
        // 二者相等，二者都爆炸，都不保留
        curr = undefined
      }
    }

    if (curr) {
      stack.push(curr)
    }
  }

  return stack
}

console.log(asteroidCollision2([10, 2, -5]))
