// 模块 count.js
let count = 0

module.exports = {
  count,
  getCount: () => {
    return count
  },
  increment: function () {
    count++
  },
}

setTimeout(() => {
  console.log('count', count)
})
