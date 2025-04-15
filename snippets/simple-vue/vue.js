class Component {
  render() {}
}

/**
 * 用于收集依赖
 * @type {Component[]}
 */
let deps = []

/**
 * 数据变化时，调用该方法通知通知重新执行
 */
function notify() {
  const tempDeps = deps
  deps = []
  tempDeps.forEach((dep) => {
    dep.render()
  })
}

class A extends Component {
  state = {
    _name: '',
  }

  constructor() {
    super()
    const self = this
    Object.defineProperty(this.state, 'name', {
      get() {
        deps.push(self)
        return self.state._name
      },
      set(value) {
        self.state._name = value
        // 新值设置，通知触发重渲染
        notify()
      },
    })
  }

  render() {
    // do something
    // 通过 this.state.name 获取值，加入依赖
    console.log(`hello ${this.state.name}`)
  }
}

const a = new A()

a.render()

setTimeout(() => {
  // 设置新值，触发 notify，重新执行
  a.state.name = 'world'
}, 3000)
