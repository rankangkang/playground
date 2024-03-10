import { EventEmitter } from './index.js'

const events = new EventEmitter()

let count = 0
events.once('emit-once', () => {
  count++
})

events.emit('emit-once')
events.emit('emit-once')
events.emit('emit-once')

console.log(count)

var handler = () => {
  count++
}
events.on('emits', handler)

events.emit('emits')
events.emit('emits')
events.emit('emits')

console.log(count)

handler = (...steps) => {
  steps.forEach(s => count += s)
}
events.on('emit-params', handler)

events.emit('emit-params', 9)
console.log(count)
