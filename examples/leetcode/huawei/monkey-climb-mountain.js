/**
 * 一天一只顽猴想要从山脚爬到山顶，途中经过一个有n个台阶的阶梯，但是这个猴子有个习惯，每一次只跳1步或3步,试问？猴子通过这个阶梯有多少种不同的跳跃方式
 * 通过递归实现
 * @param {*} steps 
 * @returns 
 */
function solution(steps) {
  if (steps === 1) {
    // 1
    return 1
  }
  if (steps === 2) {
    // 1,1
    return 1
  }
  if (steps === 3) {
    // 1,1,1 | 3
    return 2
  }

  return solution(steps - 1) + solution(steps - 3)
}

console.log(solution(50))
