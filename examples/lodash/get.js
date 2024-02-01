function get(obj, chainProp) {
  const chains = chainProp.split('.')
  try {
    return chains.reduce((result, prop) => {
      return result[prop]
    }, obj)
  } catch (error) {
    return undefined
  }
}

console.log(get({ a: { b: { c: 123 } } }, 'a.b.c'))
