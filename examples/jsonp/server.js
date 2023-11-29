const App = require('koa')

const app = new App()

app.use(async (ctx, next) => {
  const query = ctx.query
  console.log(query)
  ctx.status = 200
  ctx.res.end(`${query.cb}(${JSON.stringify({ hello: 'world', timestamp: Date.now() })})`)
})

app.listen(10010, () => {
  console.log('server is listening at port 10010')
})