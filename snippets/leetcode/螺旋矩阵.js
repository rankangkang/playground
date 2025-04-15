/**
 * tag: 中等
 * 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
 * 通递归遍历模拟
 */
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
let spiralOrder = function (matrix) {
  const row = matrix.length
  const col = matrix[0].length
  const res = []
  const VISITED = undefined
  step(0, 0, 0)
  return res

  /**
   * 按照各方向顺序进行遍历，该方向不行，就换下一个方向
   * @param {number} i
   * @param {number} j
   * @param {number} direction 0、1、2、3 分别代表右、下、左、上四个方向
   */
  function step(i, j, direction = 0) {
    if (matrix[i][j] !== VISITED) {
      res.push(matrix[i][j])
      matrix[i][j] = VISITED
    }

    const [x, y, next] = getNextStep(i, j, direction)
    if (x >= 0 && y >= 0) {
      step(x, y, next)
    }
  }

  function getNextDirection(curr) {
    return (curr + 1) % 4
  }

  function getNextStep(i, j, direction = 0) {
    const checkNextStep = (i, j, direction) => {
      switch (direction) {
        case 0: {
          // right
          if (j < col && matrix[i]?.[j + 1] !== VISITED) {
            return [i, j + 1]
          }
          break
        }
        case 1: {
          // down
          if (i < row && matrix[i + 1]?.[j] !== VISITED) {
            return [i + 1, j]
          }
          break
        }
        case 2: {
          // left
          if (j >= 0 && matrix[i]?.[j - 1] !== VISITED) {
            return [i, j - 1]
          }
          break
        }
        case 3: {
          // up
          if (i >= 0 && matrix[i - 1]?.[j] !== VISITED) {
            return [i - 1, j]
          }
          break
        }
      }

      return false
    }

    let initialCheck = true
    let curr = direction
    // 先按原方向
    while (initialCheck || curr !== direction) {
      const nextStep = checkNextStep(i, j, curr)
      if (nextStep) {
        return [...nextStep, curr]
      }

      curr = getNextDirection(curr)
      initialCheck = false
    }

    return [-1, -1]
  }
}

console.log(
  spiralOrder([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]),
)
console.log(
  spiralOrder([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
    [17, 18, 19, 20],
    [21, 22, 23, 24],
  ]),
)
