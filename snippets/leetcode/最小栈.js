/**
 * tag: 中等
 * 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
 * 实现 MinStack 类:
 * MinStack() 初始化堆栈对象。
 * void push(int val) 将元素val推入堆栈。
 * void pop() 删除堆栈顶部的元素。
 * int top() 获取堆栈顶部的元素。
 * int getMin() 获取堆栈中的最小元素。
 */

/**
 * 难度在于如何记录最小值，要求 O(1) 的复杂度，那么通过排序查找是不行的，需要引入一个辅助栈，用于记录栈每个状态的最小值。
 */
let MinStack = function () {
  if (!new.target) {
    throw new TypeError('calling MinStack constructor without new is invalid')
  }
  this.stack = []
  // 存储时间切片（下标 i）时，stack 的最小值。
  this.minStack = []
}

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.stack.push(val)
  // 比较当前值与前面的栈内元素的最小值，插入
  const lastMinVal = this.minStack[this.minStack.length - 1] ?? Number.MAX_SAFE_INTEGER
  this.minStack.push(Math.min(lastMinVal, val))
}

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.stack.pop()
  this.minStack.pop()
}

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1]
}

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1]
}
