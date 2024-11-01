function Schedular(concurrency = 1) {
  this.tasks = []
  this.pools = []
  this.running = 0

  this.add = (task) => {
    if (this.running < concurrency) {
      this.running++
      Promise.resolve(task())
        .then((data) => {
          console.log(data)
          this.running--
          this.run()
        })
        .catch(() => {
          this.running--
          this.run()
        })
    } else {
      this.pools.push(task)
    }
  }

  this.run = () => {
    if (this.pools.length > 0) {
      this.add(this.pools.shift())
    }
  }

  return this
}

const s = new Schedular(3)

const ps = new Array(30)
  .fill(0)
  .map(
    (_, i) => () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(i)
        }, 1000)
      }),
  )
  .forEach((p) => {
    s.add(p)
  })
