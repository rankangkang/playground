function thousandSeparator(n) {
  const nS = String(n)
  const nA = []
  let idx = nS.length
  while (idx > 0) {
    if (idx >= 3) {
      const t = nS.slice(idx - 3, idx)
      idx -= 3
      nA.unshift(t)
    } else {
      const t = nS.slice(0, idx)
      nA.unshift(t)
      idx = 0
    }
  }

  return nA.join(',')
}

console.log(thousandSeparator(123456789)) // 123,456,789
console.log(thousandSeparator(1234567)) // 1,234,567

function thousandSeparator2(n) {
  const nS = String(n)
  return nS.replace(/\d(?=(\d{3})+(?!\d))/g, '$&,')
}

console.log(thousandSeparator2(123456789)) // 123,456,789
console.log(thousandSeparator2(1234567)) // 1,234,567

/**
 * 使用 Intl
 * @param {number} number
 */
function thousandSeparator3(number) {
  return Intl.NumberFormat('en-US').format(number)
}

console.log(thousandSeparator3(123456789)) // 123,456,789
console.log(thousandSeparator3(1234567)) // 1,234,567

/**
 * 使用 toLocalString
 * @param {number} number
 */
function thousandSeparator4(number) {
  return number.toLocaleString('en-US')
}

console.log(thousandSeparator4(123456789)) // 123,456,789
console.log(thousandSeparator4(1234567)) // 1,234,567
