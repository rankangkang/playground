/**
 * 以现有对象为原型，创建一个新的对象
 * @param {*} proto
 */
Object._create = function (proto) {
  // 提供一个干净的中间类
  function T() {}
  T.prototype = proto
  return new T()
}

const parent = new Object({ name: 'kk' })
const child = Object._create(parent)
console.log(child, child.__proto__)
