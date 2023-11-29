// 判断是否为 proxy
function isProxy(target) {
  return Object.prototype.toString.call(target) === '[object Proxy]'
}

// 判断自身是否是 proxy，递归 proxy 每一个属性
function proxyObject(target) {
  if (typeof target === 'object' && target !== null) {
    if (!isProxy(target)) {
      console.log('proxy', target)
      return new Proxy(target, handler)
    }
  }
  return target
}

/**
 * @type {ProxyHandler}
 */
const handler = {
  get: function (target, prop) {
    console.log('get', target, '==>', prop)
    const value = Reflect.get(target, prop)
    // 是否是 plainObject 或数组
    if (value !== null && typeof value === 'object') {
      return proxyObject(value)
    }

    // 正常值
    return value
  },
  set: function (target, prop, value) {
    console.log('set', target, '==>', prop, '==>', value)
    // return Reflect.set(target, prop, value)
    const flag = Reflect.set(target, prop, value)
    if (!flag) return false
    if (value !== null && typeof value === 'object') {
      return new Proxy(Reflect.get(target, prop), handler)
    }
    return true
  },
}

const obj = new Proxy(
  {
    name: 'kk',
    ids: ['1', '2', '3', { name: 2 }],
  },
  handler,
)

obj.name = 'll'

obj.ids.push(5)

obj.demo = { name: 'demo' }

obj.demo.name = 'kk'

console.log(obj.demo)

obj.demo.name = 'll'

console.log(obj.demo)
