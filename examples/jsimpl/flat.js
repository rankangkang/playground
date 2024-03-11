Array._flat = function(target) {
  if (!(target instanceof Array)) {
    throw new Error("target must be instance of Array")
  }

  const result = []
  target.forEach((e) => {
    if (e instanceof Array) {
      result.push(...Array._flat(e))
    } else {
      result.push(e)
    }
  })

  return result
}

const arr = [1, [2, [3, 4, 5, [6,7], 8], 9], 10]

console.log(Array._flat(arr))