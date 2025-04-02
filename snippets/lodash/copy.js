/**
 * 浅拷贝
 */
function shallowCopy(obj) {
  if (obj instanceof Array) {
    return Object.assign([], obj)
  }
  if (obj instanceof Object) {
    return Object.assign({}, obj)
  }

  return obj
}

/**
 * 深拷贝
 * @param {*} obj
 * @returns
 */
function deepCopy(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  let ret = obj instanceof Array ? [] : {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const item = obj[key]
      ret[key] = deepCopy(item)
    }
  }

  return ret
}

const target = {
  name: 'kk',
  age: 24,
  likes: [1, 2, '3', { key: 5 }, [7, 8]],
}

console.log(shallowCopy(target))

console.log(deepCopy(target))
