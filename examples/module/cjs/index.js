const c = require('./count')

console.log('index c.count', c.count); // 输出 0
console.log('index c.getCount', c.getCount()); // 输出 0
c.increment();
console.log('index c.count', c.count); // 输出 0
console.log('index c.getCount', c.getCount()); // 输出 1
