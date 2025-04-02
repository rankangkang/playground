export default class Scheduler {
  constructor(concurrency = 1) {
    this.waitTasks = [] // 待执行的任务队列
    this.excutingTasks = [] // 正在执行的任务队列
    this.concurrency = concurrency // 允许同时运行的任务数量
  }

  add(promiseMaker) {
    if (this.excutingTasks.length < this.concurrency) {
      this.run(promiseMaker)
    } else {
      this.waitTasks.push(promiseMaker)
    }
  }

  run(promiseMaker) {
    const len = this.excutingTasks.push(promiseMaker)
    const index = len - 1
    promiseMaker().then(() => {
      this.excutingTasks.splice(index, 1)
      if (this.waitTasks.length > 0) {
        this.run(this.waitTasks.shift())
      }
    })
  }
}
