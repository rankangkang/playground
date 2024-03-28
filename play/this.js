/**
 * this 指向
 */
const obj = {
  c: 'c',
  x: () => {
    console.log(this)
  },
  y: function() {
    console.log(this)
  }
}

const t = obj.y

t() // window，严格模式下是 undefined
obj.x() // window，严格模式下是 undefined
// 箭头函数的 this 在其定义时就已经确定了，会指向其所在上下文的 this，
// 一个函数（类）内部就是一个独立的上下文，此处若直接在浏览器执行，相当于直接在全局 context 下定义，其 this 指向的就是 window
obj.y()