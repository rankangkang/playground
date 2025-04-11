/**
 * tag: 简单
 */
/**
 * @param {string} moves
 * @return {boolean}
 */
let judgeCircle = function (moves) {
  let coord = [0, 0]

  const step = (direction) => {
    switch (direction) {
      case 'R':
        coord[0] += 1
        break
      case 'L':
        coord[0] -= 1
        break
      case 'U':
        coord[1] -= 1
        break
      case 'D':
        coord[1] += 1
        break
    }
  }

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i]
    step(move)
  }
  return coord.every((x) => x === 0)
}

console.log(judgeCircle('UD'))
