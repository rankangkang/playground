/**
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 */
// 用于缓存
const cacheMap = {};

function solution(stairs) {
  if (stairs === 1) {
    return 1;
  }

  if (stairs === 2) {
    // 1, 1 | 2
    return 2;
  }

  if (cacheMap[stairs]) {
    return cacheMap[stairs];
  }

  const r1 = solution(stairs - 1);
  const r2 = solution(stairs - 2);
  cacheMap[stairs - 1] = r1;
  cacheMap[stairs - 2] = r2;

  return r1 + r2;
}

function solution2(stairs) {
  if (stairs === 1) {
    return 1;
  }

  if (stairs === 2) {
    // 1, 1 | 2
    return 2;
  }

  return solution(stairs - 1) + solution(stairs - 2);
}

console.time('climb-stairs');
console.log(solution(100));
console.timeEnd('climb-stairs');

console.time('climb-stairs2');
console.log(solution2(100));
console.timeEnd('climb-stairs2');


/**
 * solution3
 */
const cache = new Map()
cache.set(1, 1)
cache.set(2, 2)

const getCache = (key, getValue) => {
  let val
  if (!cache.has(key)) {
    val = getValue()
    cache.set(key, val)
  } else {
    val = cache.get(key)
  }

  return val
}

var climbStairs = function (n) {
  if (cache.has(n)) {
    return cache.get(n)
  }

  let sub1 = getCache(n - 1, () => climbStairs(n - 1))
  let sub2 = getCache(n - 2, () => climbStairs(n - 2))

  return sub1 + sub2
};