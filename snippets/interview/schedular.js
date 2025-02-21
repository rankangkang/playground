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


// 控制并发的调度方法
async function schedule(concurrency, ...promiseCreators) {
  const result = [];
  const promiseCreatorQueue = promiseCreators.map((promiseCreator, index) => ({ promiseCreator, index }));
  let runningCount = 0;

  let resolve, reject;
  const resultPromise = new Promise((res, rej) => { resolve = res; reject = rej; });

  function run() {
    if (runningCount === 0 && promiseCreatorQueue.length === 0) {
      resolve(result);
      return;
    }

    while (runningCount < concurrency && promiseCreatorQueue.length) {
      const { promiseCreator, index } = promiseCreatorQueue.shift();
      runningCount++;
      promiseCreator().then((res) => {
        result[index] = res;
        runningCount--;
        run();
      }).catch((err) => {
        reject(err)
      })
    }
  }

  run();

  return resultPromise;
}

const delay = (time) => new Promise((resolve) => setTimeout(() => resolve(time), time));
const promiseCreators = new Array(100).fill(0).map((_, index) => () => delay(1000).then(() => {
  console.log(index)
}));

schedule(3, ...promiseCreators)