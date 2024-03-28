# signal 响应式原理

```js
const observers = []

const getCurrentObserver = () => {
  return observers[observers.length - 1]
}

const createSignal = (value) => {
  const subscribers = new Set()

  const getter = () => {
    // 获取被压入栈顶的观察者，并添加订阅
    const currentObserver = getCurrentObserver()
    if (currentObserver) {
      subscribers.add(currentObserver)
    }

    return value
  }

  const setter = (nextValue) => {
    value = nextValue
    // 执行订阅
    subscribers.forEach((subscriber) => subscriber?.())
  }

  return [getter, setter]
}

const createEffect = (effect) => {
  const execute = () => {
    observers.push(execute)
    try {
      effect?.()
    } finally {
      observers.pop()
    }
  }

  execute()
}
```

仅通过上面的实现代码来分析响应式原理是比较困难的，结合实际使用来分析便会简单得多，以下是一个简单的使用示例：

```js
const [getCount, setCount] = createSignal(0)

createEffect(() => {
  const count = getCount()
  console.log('count', count)
})

setCount(10086)

setTimeout(() => setCount(11), 3000)
```

---

好了，我们先看第一句：

```js
+ const [getCount, setCount] = createSignal(0)
```

显而易见，这个语句创建了一个 signal，没什么好说的。我们接着看下面的：

```js
const [getCount, setCount] = createSignal(0)

+ createEffect(() => {
+   const count = getCount()
+   console.log('count', count)
+ })
```

在这里我们创建了一个 effect，结合实现分析，我们发现 effect 会被包装为一个 execute 方法，并会立即执行一次。

execute 方法执行时发生了什么？首先会将自身压入 observers 观察者栈顶，随后执行 被包裹的 effect 函数，执行完成后再将自己从 execute 中推出。

我们继续来看 effect 做了写什么：在注册的 effect 中，我们通过 getter（即 getCount）获取 count 值，此时在 observers 观察者栈顶的 execute 方法便会被注册到 signal 的 subscribers 中（因为 effect 在 execute 方法入栈与出栈之间执行，所以在 getter 中可以取到 execute 方法）。

> 看到后文，你便会发现魔法发生在这里。

```js
const [getCount, setCount] = createSignal(0)

createEffect(() => {
  const count = getCount()
  console.log('count', count)
}) + setCount(10086)
```

接着，我们使用 setter（即 setCount）设置新的 count 值，此时 setter 将会触发注册在 signal subscribers 中的全部 execute 方法。

```js
const [getCount, setCount] = createSignal(0)

createEffect(() => {
  const count = getCount()
  console.log('count', count)
})

setCount(10086) + setTimeout(() => setCount(11), 3000)
```

再次使用 setter 设置新值时，因为 execute 方法已经被注册到 subscribers 中，故会再次被执行。

execute 方法会再次将自身压入 observers 栈顶，并再次执行 effect 函数，随后在 effect 函数中再次通过 getter 将 execute 方法注册到 subscribers 中。也就是说，execute 方法会被重复注册，这也是为什么 subscribers 使用 Set 而不使用 Array 存储引用（因为重复添加时 Set 会保证元素的唯一性，而 Array 不会），毕竟谁都不希望 setter 每触发一次，effect 执行次数翻倍吧。
