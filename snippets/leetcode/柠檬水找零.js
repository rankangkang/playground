/**
 * 贪心模拟，通俗版本，更好理解，使用 hash 表来计数
 * @param {number[]} bills
 * @return {boolean}
 */
let lemonadeChange = function (bills) {
  let totalExchange = 0
  const map = new Map()

  /**
   * 收钱，并加上对应的金额
   * @param {number} bill
   */
  const charge = (bill) => {
    const count = map.get(bill) || 0
    map.set(bill, count + 1)
    totalExchange += bill
  }

  /**
   * 找零，若存在指定金额的零钱就找钱，并减去对应的金额
   * @param {number} amount
   * @returns
   */
  const takeExchange = (amount) => {
    const count = map.get(amount) || 0
    if (count > 0 && totalExchange >= amount) {
      totalExchange -= amount
      map.set(amount, count - 1)
      return true
    }

    return false
  }

  /**
   *
   * @param {*} shouldExchange
   * @returns
   */
  const exchange = (shouldExchange) => {
    if (shouldExchange === 0) {
      return true
    }

    if (shouldExchange > totalExchange) {
      return false
    }

    if (shouldExchange >= 20) {
      if (takeExchange(20)) {
        return exchange(shouldExchange - 20)
      }
      if (takeExchange(10)) {
        return exchange(shouldExchange - 10)
      }
      if (takeExchange(5)) {
        return exchange(shouldExchange - 5)
      }
      return false
    } else if (shouldExchange >= 10) {
      if (takeExchange(10)) {
        return exchange(shouldExchange - 10)
      }
      if (takeExchange(5)) {
        return exchange(shouldExchange - 5)
      }
      return false
    } else {
      if (takeExchange(5)) {
        return exchange(shouldExchange - 5)
      }
      return false
    }
  }

  for (let i = 0; i < bills.length; i++) {
    const bill = bills[i]
    const shouldExchange = bill - 5
    charge(bill)
    if (!exchange(shouldExchange)) {
      return false
    }
  }

  return true
}

console.log(lemonadeChange([5, 5, 5, 10, 20]))

/**
 * 贪心模拟优化版本，只记录 5 元与 10 元的数量
 * @param {number[]} bills
 * @return {boolean}
 */
let lemonadeChange2 = function (bills) {
  // 输入只会有 5、10、20 ，找零只会用到 5、10，所以只要记住当前有的 5 块与 10 块的数量就可以了
  let ten = 0
  let five = 0

  /**
   * 收钱，记录可用零钱数
   * @param {number} bill
   */
  const charge = (bill) => {
    if (bill === 5) {
      five += 1
    } else if (bill === 10) {
      ten += 1
    }
  }

  /**
   * 找指定金额零前，这里只可能是 5、10
   * @param {number} amount
   * @returns
   */
  const takeExchange = (amount) => {
    if (amount === 5 && five) {
      five--
      return true
    } else if (amount === 10 && ten) {
      ten--
      return true
    }

    return false
  }

  /**
   * @param {*} shouldExchange
   * @returns
   */
  const exchange = (shouldExchange) => {
    if (shouldExchange === 0) {
      return true
    }

    // 零钱一定小于等于 15
    if (shouldExchange >= 10) {
      if (takeExchange(10)) {
        return exchange(shouldExchange - 10)
      }
      if (takeExchange(5)) {
        return exchange(shouldExchange - 5)
      }
      return false
    } else {
      if (takeExchange(5)) {
        return exchange(shouldExchange - 5)
      }
      return false
    }
  }

  for (let i = 0; i < bills.length; i++) {
    const bill = bills[i]
    const shouldExchange = bill - 5
    charge(bill)
    if (!exchange(shouldExchange)) {
      return false
    }
  }

  return true
}

/**
 * 最终优化版本
 * @param {number[]} bills
 * @return {boolean}
 */
let lemonadeChange3 = function (bills) {
  // 输入只会有 5、10、20 ，找零只会用到 5、10，所以只要记住当前有的 5 块与 10 块的数量就可以了
  let ten = 0
  let five = 0

  for (let i = 0; i < bills.length; i++) {
    const bill = bills[i]
    if (bill === 5) {
      five++
    } else if (bill === 10) {
      // 找零 5 块
      if (!five) {
        return false
      }
      five--
      ten++
    } else {
      // 找零 15
      if (ten && five) {
        // 一张 10 块，一张五块
        ten--
        five--
      } else if (five >= 3) {
        // 有 3 张 5 块
        five -= 3
      } else {
        return false
      }
    }
  }

  return true
}
