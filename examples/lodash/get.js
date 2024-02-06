/**
 * lodash.get
 * @param {any} obj 
 * @param {string} prop 
 * @returns 
 */
function get(obj, prop) {
  const chains = prop
    .replace(/\[/g, ".")
    .replace(/\]/g, "")
    .split(".")
  try {
    return chains.reduce((result, prop) => {
      return result[prop]
    }, obj)
  } catch (error) {
    return undefined
  }
}

const obj = {
  a: {
    b: [
      {
        c: 123
      }
    ]
  }
}

console.log(get(obj, 'a.b[0].c'))
