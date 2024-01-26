import { createSignal, createEffect } from './index.js'

const [getCount, setCount] = createSignal(0)

// createEffect 创建的 effect 包装成 execute，且会立即执行
// 执行前会将 effect 包裹放入观察者队列中，待执行完后从观察者队列中移除
createEffect(() => {
  // 获取 getter 时，此时观察者已被压入栈顶
  // 可在 signal getter 中获取到观察者，并将其加入到订阅者中
  const count = getCount()
  console.log('count', count)
})

// 在使用 setter 改变值时，所有订阅者将会被触发
// 订阅者本身为添加的观察者（创建的 execute 函数）
setCount(10086)

// 在下一次 setter 执行时，因为 execute 函数已经被注册到 subscribers 中，故会再次被执行
// 在 effect 中获取 getter，会再次执行 execute 函数，会将 execute 再次方法 subscribers 中
// 这也是为什么 subscribers 使用 Set 而不使用 Array，重复添加时 Set 会保证元素的唯一性，而 Array 不会
// 你也不希望 setter 每触发一次，effect 执行次数翻倍吧
setTimeout(() => setCount(11), 3000)

const [getName, setName] = createSignal("kk")

createEffect(() => {
  const name = getName()
  console.log('name', name)
})

setName('ll')

setTimeout(() => setName('kk'), 5000)