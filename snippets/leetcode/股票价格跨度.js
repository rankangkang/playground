/** https://leetcode.cn/problems/online-stock-span/description/ */

let StockSpanner = function () {
  // 栈底到栈顶的单调递减
  this.stack = []
  this.stack.push({ day: -1, price: Infinity })
  this.day = -1
}

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function (price) {
  this.day++
  while (this.stack.at(-1).price <= price) {
    this.stack.pop()
  }

  this.stack.push({ day: this.day, price })
  return this.day - this.stack.at(-2).day
}

// const stockSpanner = new StockSpanner();
// stockSpanner.next(100); // 返回 1
// stockSpanner.next(80);  // 返回 1
// stockSpanner.next(60);  // 返回 1
// stockSpanner.next(70);  // 返回 2
// stockSpanner.next(60);  // 返回 1
// stockSpanner.next(75);  // 返回 4 ，因为截至今天的最后 4 个股价 (包括今天的股价 75) 都小于或等于今天的股价。
// stockSpanner.next(85);  // 返回 6

console.log(StockSpanner.calc([100, 80, 60, 70, 60, 75, 85]))
console.log(StockSpanner.calc([31, 41, 48, 59, 79]))
