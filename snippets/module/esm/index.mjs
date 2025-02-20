import { count, addCount } from './count.mjs'

console.log('step 1', count) // 0

addCount()

console.log('step 2', count) // 1
