/**
 * parse 字符串
 * @param {string} s
 * @param {any} meta
 * @returns
 */
function parseString(s, meta) {
  return s.replace(/\{\{(\d|\w|\s|\.)+\}\}/g, (match) => {
    const prop = match.substring(2, match.length - 2).trim()
    return get(meta, prop)
  })

  /**
   * 类似 lodash.get
   * @param {any} data
   * @param {string} prop
   * @returns
   */
  function get(data, prop) {
    const props = prop.split('.')
    return props.reduce((res, p) => {
      return res[p]
    }, data)
  }
}

const str = parseString('hello {{ name }}, age {{ age.num }}', { name: 'kk', age: { num: 12 } })
console.log(str)
