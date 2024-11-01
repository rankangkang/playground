import SP from './index.js'

console.log('script start')
console.log(1)

const p = new SP((resolve) => {
  console.log(2)
  setTimeout(() => {
    console.log(3)
    resolve('data')
    console.log(4)
  }, 1000)
  console.log(5)
})

console.log(6)

p.then((data) => {
  console.log(7)
  console.log('data:', data)
  return 'nextData'
})
  .then((data) => {
    console.log(8)
    console.log('data:', data)
    // eslint-disable-next-line no-throw-literal
    throw 'error'
  })
  .catch((e) => {
    console.log(9)
    console.log('error', e)
  })
  .finally(() => {
    console.log('finally')
    throw 'finally error'
  })
  .catch((e) => {
    console.log('finally error catch:', e)
    return 10
  })
  .finally(() => {
    return 'finally 11'
  })
  .then((data) => {
    // should be 10
    console.log('finally finally then:', data)
  })

console.log('script end')
