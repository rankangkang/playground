# cjs 导出值的拷贝

cjs 导出的是值的拷贝：
- 导出的是原始类型时，导出的是原始类型的值拷贝，类似于 const，外部修改会直接报错。
- 导出的是引用类型时，导出的是引用的拷贝，此时可通过该引用修改指向的对象的属性值。

```js
const c = require('./count')
const v = require('./value')

console.log('step 0:', v, v.value, v.getValue()); // { value: 1, getValue: [Function: getValue], inc: [Function: inc] } 1 1
v.inc();
console.log('step 1:', v, v.value, v.getValue()); // { value: 2, getValue: [Function: getValue], inc: [Function: inc] } 2 2

console.log('step 1:', c) // 0
c++; // TypeError: Assignment to constant variable.
console.log('step 2:', c)
```
