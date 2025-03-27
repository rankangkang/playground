/**
 * tag: 简单
 * 模拟加法或转为 number 后计算
 */
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
let addBinary = function (a, b) {
  // 补 0
  if (a.length < b.length) {
    a = new Array(b.length - a.length).fill(0).join('') + a
  } else if (b.length < a.length) {
    b = new Array(a.length - b.length).fill(0).join('') + b
  }

  const add = (a, b, c = 0) => {
    const res = a + b + c
    const sum = res % 2
    const carry = Math.floor(res / 2)
    return [sum, carry]
  }

  const len = a.length
  let lastCarry = 0
  let res = ''
  for (let i = len - 1; i >= 0; i--) {
    const nA = Number(a[i])
    const nB = Number(b[i])
    const [sum, carry] = add(nA, nB, lastCarry)
    res = sum + res
    lastCarry = carry
  }

  if (lastCarry) {
    res = lastCarry + res
  }

  return res
}

console.log(addBinary('1010', '1011'))

function addBinary2(a, b) {
  a = parseInt(a, 2)
  b = parseInt(b, 2)
  return (a + b).toString(2)
}

console.log(addBinary2('1010', '1011'))
