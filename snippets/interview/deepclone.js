function deepClone(obj) {
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }

  const res = obj instanceof Array ? [] : {}
  for (const key in obj) {
    res[key] = deepClone(obj[key])
  }

  return res
}

const target = {
  name: 'kk',
  age: 24,
  likes: [1, 2, '3', { key: 5 }, [7, 8]],
}

const nextTarget = deepClone(target)
console.log(JSON.stringify(nextTarget, null, '  '))
