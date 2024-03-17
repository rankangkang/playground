/**
 * 为了充分发挥GPU算力，需要尽可能多的将任务交给GPU执行，现在有一个任务数组，数组元素表示在这1s内新增的任务个数，且每秒都有新增任务。
 * 假设GPU最多一次执行n个任务，一次执行耗时1s，在保证GPU不空闲的情况下，最少需要多长时间执行完成。
 * @param {number[]} tasks 每个元素代表该时间（秒）新增多少任务
 * @param {number} concurrent 并发
 */
function solution(tasks, concurrent) {
  let tick = 0
  let remain = 0
  tasks.forEach((t) => {
    tick += 1
    if (remain + t > concurrent) {
      remain = (remain + t) - concurrent
    } else {
      remain = 0
    }
  })

  if (remain > 0) {
    tick += Math.ceil(remain / concurrent)
  }

  return tick
}

console.log(solution([1,2,3,4,5], 3))
