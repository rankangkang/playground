const observers = []

const getCurrentObserver = () => {
  return observers[observers.length - 1]
}

/**
 * @type {import("./types")["createSignal"]}
 */
export const createSignal = (value) => {
  const subscribers = new Set()

  const getter = () => {
    // 获取 getter 被调用时的 observer
    const currentObserver = getCurrentObserver()
    if (currentObserver) {
      subscribers.add(currentObserver)
    }

    return value
  }

  const setter = (nextValue) => {
    value = nextValue

    // 数据改变，执行订阅 signal 的观察者
    subscribers.forEach(subscriber => subscriber?.())
  }

  return [getter, setter]
}

export const createEffect = (effect) => {
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
