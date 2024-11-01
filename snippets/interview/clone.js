function deepClone(obj) {
  if (obj === null) {
    return obj
  }
  if (typeof obj !== 'object') {
    return obj
  }

  let result
  if (obj instanceof Array) {
    result = []
    obj.forEach((v, i) => {
      result[i] = deepClone(v)
    })
  } else if (obj instanceof Object) {
    result = {}
    for (const key in obj) {
      result[key] = deepClone(obj[key])
    }
  }

  return result
}

const a = {
  b: 'c',
  d: ['e', 'f', { g: 'h', i: ['j', 'k'] }],
  l: null,
  m: undefined,
  n: 0,
}

const b = deepClone(a)

a.b = 'b'
a.d = 'd'

console.log(b)
