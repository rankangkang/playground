export class EventEmitter {
  /** @type {Map<string, ListenerRecorder[]>} */
  map

  constructor() {
    this.map = new Map()
  }

  /**
   * 订阅
   * @param {string} key
   * @param {Listener} listener
   */
  on(key, listener) {
    const list = this.map.get(key) || []
    const nextList = Array.prototype.concat.call(list, { once: false, listener })
    this.map.set(key, nextList)
  }

  /**
   * 订阅一次
   * @param {string} key
   * @param {Listener} listener
   */
  once(key, listener) {
    const list = this.map.get(key) || []
    const nextList = Array.prototype.concat.call(list, { once: true, listener })
    this.map.set(key, nextList)
  }

  /**
   * 取消订阅
   * @param {string} key
   * @param {Listener} listener
   */
  off(key, listener) {
    const list = this.map.get(key) || []
    const nextList = list.filter((item) => item.listener !== listener)
    this.map.set(key, nextList)
  }

  /**
   * 清除所有订阅
   * @param {*} key
   */
  clear(key) {
    this.map.delete(key)
  }

  /**
   * 发布
   * @param {string} key
   * @param  {...any} args
   */
  emit(key, ...args) {
    const list = this.map.get(key) || []
    list?.forEach(({ once, listener }) => {
      if (once) this.off(key, listener)
      listener(...args)
    })
  }
}
