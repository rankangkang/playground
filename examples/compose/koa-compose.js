/**
 * 将多个 middleware 组合为一个函数运行
 * @param {*} ctx 
 * @param {*} middlewares 
 * @returns 
 */
function compose(ctx, middlewares) {
  let index = 0
  
  return function() {
    next()
  }

  async function next() {
    const mw = middlewares[index]
    if (mw) {
      index++
      return await mw(ctx, next)
    } else {
      return Promise.resolve()
    }
  }
}