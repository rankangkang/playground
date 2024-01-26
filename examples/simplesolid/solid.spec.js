import { createMemo } from '@pg/signal'

const m = createMemo(() => {
  console.log('get random')
  return Math.random()
})

new Array(10).fill(0).forEach(() => {
  console.log(m())
})
