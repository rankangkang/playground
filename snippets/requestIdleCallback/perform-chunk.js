/**
 * 利用 rIC 执行一系列任务
 * @param {Array<Function>} tasks
 */
function performTrunk(tasks) {
  let index = 0

  function run(ddl) {
    while (index < tasks.length && ddl.timeRemaining() > 0) {
      const task = tasks[index]
      task()
      index++
    }

    if (index < tasks.length) {
      requestIdleCallback(run)
    }
  }

  requestIdleCallback(run)
}
