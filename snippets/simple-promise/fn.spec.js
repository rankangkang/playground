import SP from './index.js'

const spCreators = new Array(10).fill(0).map(() => {
  return new SP((resolve, reject) => {
    const delay = Math.ceil(Math.random() * 10000)
    setTimeout(() => {
      resolve(delay)
    }, delay)
  })
})

SP.all(spCreators).then((data) => {
  console.log('SP.all:', data)
})

SP.race(spCreators).then((data) => {
  console.log('SP.race:', data)
})
