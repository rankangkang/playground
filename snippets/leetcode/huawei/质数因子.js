/**
 * 题目会保证输入一定是一个质因数的积（合数），
 * @param {number} num
 */
function findPrime(num) {
  const result = []
  let i = 2
  while (i <= Math.sqrt(num)) {
    if (isPrime(i)) {
      // 当 i 是质数，且一直能被整除时，将 i 假如结果
      while (num % i === 0) {
        result.push(i)
        num /= i
      }
    }
    i++
  }

  if (num > 1) {
    result.push(num)
  }

  return result
}

// 这里不要加缓存，加了内存会超
// 其实这一步都可以不加，因为当把所有较小的质数都整除以后，下一个能被整除的一定也是质因数
function isPrime(num) {
  const sqrtNum = Math.sqrt(num)
  let isPrimeNum = true
  for (let i = 2; i <= sqrtNum; i++) {
    if (num % i === 0 && num !== i) {
      isPrimeNum = false
      break
    }
  }

  return isPrimeNum
}
