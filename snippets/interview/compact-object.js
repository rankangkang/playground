/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
let compactObject = function (obj) {
  if (obj instanceof Array) {
    let i = 0
    while (i < obj.length) {
      if (!obj[i]) {
        obj.splice(i, 1)
        continue
      }
      if (obj[i] instanceof Object) {
        compactObject(obj[i])
      }
      i++
    }
  } else if (obj instanceof Object) {
    for (const key in obj) {
      if (!obj[key]) {
        delete obj[key]
        continue
      }
      if (obj[key] instanceof Object) {
        compactObject(obj[key])
      }
    }
  }

  return obj
}

console.log(compactObject([null, 0, false, 1]))
console.log(compactObject({ a: null, b: [false, 1] }))
