import http from 'node:http'

export default class Koa {
  middlewares = []

  createContext(req, res) {
    // 创建 context
    return { req, res }
  }

  use(mw) {
    this.middlewares.push(mw)
  }

  compose(ctx) {
    const middlewares = this.middlewares
    let index = 0

    return async function next() {
      const mw = middlewares[index]
      if (mw) {
        index += 1
        return mw(ctx, next)
      } else {
        return Promise.resolve()
      }
    }
  }

  callback() {
    return http.createServer((req, res) => {
      const ctx = this.createContext(req, res)
      const fn = this.compose(ctx)
      fn()
    })
  }

  listen(...args) {
    const app = this.callback()
    return app.listen(...args)
  }
}
