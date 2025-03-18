/**
 * https://www.nowcoder.com/practice/119bcca3befb405fbe58abe9c532eb29?tpId=37&rp=1&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D37&difficulty=3&judgeStatus=&tags=&title=&gioEnter=menu
 */

const directiveMap = new Map([
  ['W', (coord, step) => [coord[0], coord[1] + step]],
  ['A', (coord, step) => [coord[0] - step, coord[1]]],
  ['S', (coord, step) => [coord[0], coord[1] - step]],
  ['D', (coord, step) => [coord[0] + step, coord[1]]],
])

/**
 * @param {string} str
 */
function parseDirect(str) {
  const strArr = str.split(';').filter(Boolean)
  return strArr.reduce((r, item) => {
    const direct = item[0]
    const step = Number(item.slice(1))

    if (directiveMap.has(direct) && !isNaN(step) && step >= 1 && step <= 99) {
      r.push({ direct, step })
    }
    return r
  }, [])
}

function perform(str) {
  const directives = parseDirect(str)
  let pos = [0, 0]
  directives.forEach(({ direct, step }) => {
    const handler = directiveMap.get(direct)
    pos = handler(pos, step)
  })

  return pos
}

// console.log(perform('A10;S20;W10;D30;X;A1A;B10A11;;A10;'))
