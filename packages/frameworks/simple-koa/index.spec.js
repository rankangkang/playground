import Koa from './index.js'

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.res.status = 200
  ctx.res.write('1\n')
  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
  await next()
})

app.use(async (ctx, next) => {
  ctx.res.write('2\n')
  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
  next()
})

app.use(async (ctx) => {
  ctx.res.write('3\n')
  ctx.res.statusCode = 200
  ctx.res.end('hello world')
})

app.listen(8888, () => {
  console.log('server is listening at port 8888')
})
