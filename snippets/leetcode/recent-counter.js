/**
 * 题目：t 代表员工编号，ping(t) 代表雇佣一个新的员工，但雇佣前，得先解雇编号小于 t - 3000 的老员工
 */
let RecentCounter = function () {
  this.queue = []
}

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
  while (this.queue.length > 0) {
    const time = this.queue[0]
    if (time < t - 3000) {
      this.queue.shift()
    } else {
      break
    }
  }

  this.queue.push(t)
  return this.queue.length
}
