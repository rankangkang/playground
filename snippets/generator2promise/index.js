/* eslint-disable */

/**
 *
 * @param {() => Generator} generatorFunction
 * @returns
 */
function generator2promise(generatorFunction) {
  return new Promise((resolve, reject) => {
    step(generatorFunction())

    /**
     * 步进生成器
     * @param {Generator} generator
     */
    function step(generator, ...args) {
      let next = generator.next(...args)
      if (next.done) {
        // 如果生成器完成，则使用 resolve 返回最终结果
        resolve(next.value)
      } else {
        // 如果生成器未完成，则继续迭代下一步
        Promise.resolve(next.value)
          .then((result) => step(generator, result))
          .catch((error) => reject(error))
      }
    }
  })
}

function* g() {
  const a = yield new Promise((resolve) => setTimeout(() => resolve(1), 1000))
  const b = yield 2 + a
  return 'ABC' + b
}

generator2promise(g2).then((d) => {
  console.log(d)
})

/**
 * simple version
 * 生成器实现了 iterator，因此可以使用 for of 遍历
 * @param {GeneratorFunction} g
 */
function g2p(g) {
  return new Promise(async (resolve, reject) => {
    try {
      const t = g()
      let lastValue
      for (const step of t) {
        lastValue = await step
      }
      resolve(lastValue)
    } catch (error) {
      reject(error)
    }
  })
}

function* g2() {
  const a = yield 1
  const b = yield 2
  return b + a
}

g2p(g2)
