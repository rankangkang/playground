/**
 * @param {character[][]} board
 * @return {boolean}
 */
let isValidSudoku = function (board) {
  /**
   * @type {Record<number, Set<number>>}
   */
  let rows = {}
  /**
   * @type {Record<number, Set<number>>}
   */
  let columns = {}
  /**
   * @type {Record<number, Set<number>>}
   */
  let boxes = {}

  // 遍历一次，对行、列、子方块进行校验
  for (let i = 0; i < 9; i++) {
    if (!rows[i]) {
      rows[i] = new Set()
    }
    for (let j = 0; j < 9; j++) {
      if (!columns[j]) {
        columns[j] = new Set()
      }
      const item = board[i][j]
      if (item !== '.') {
        // 遇到数字
        const boxIdx = Math.floor(i / 3) * 3 + Math.floor(j / 3)
        if (!boxes[boxIdx]) {
          boxes[boxIdx] = new Set()
        }

        if (rows[i].has(item) || columns[j].has(item) || boxes[boxIdx].has(item)) {
          return false
        }

        rows[i].add(item)
        columns[j].add(item)
        boxes[boxIdx].add(item)
      }
    }
  }

  return true
}
