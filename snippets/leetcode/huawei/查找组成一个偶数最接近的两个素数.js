/**
 * 暴力穷举
 * @param {string} line
 */
function solution(line) {
  const n = Number(line)
  const half = n / 2
  let res = []
  let minDiff = Infinity
  for (let i = 2; i <= half; i++) {
    if (isPrime(i) && isPrime(n - i)) {
      const diff = n - i - i
      if (minDiff > diff) {
        res = [i, n - i]
        minDiff = diff
      }
    }
  }
  console.log(res[0])
  console.log(res[1])
}

function isPrime(n) {
  const sqrtn = Math.sqrt(n)
  for (let i = 2; i <= sqrtn; i++) {
    if (n % i === 0 && i !== n) {
      return false
    }
  }

  return true
}
