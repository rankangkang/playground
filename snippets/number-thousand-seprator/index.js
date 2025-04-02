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

function numberThounsandSeprate2(n) {
  const nS = String(n)
  return nS.replace(/\d(?=(\d{3})+(?!\d))/g, '$&,')
}

console.log(numberThounsandSeprate2(123456789)) // 123,456,789
console.log(numberThounsandSeprate2(1234567)) // 1,234,567
