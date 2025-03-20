/**
 * @param {string} str
 */
function solution(str) {
  const map = new Map()
  for (let i = 0; i < str.length; i++) {
    const ch = str.charAt(i)
    if (!map.has(ch)) {
      map.set(ch, { index: i, times: 1 })
      continue
    }

    const target = map.get(ch)
    target.times++
  }

  let res = -1
  let minIdx = Infinity
  map.forEach(({ index, times }, key) => {
    if (times > 1) {
      return
    }

    if (minIdx > index) {
      res = key
      minIdx = index
    }
  })

  return res
}
