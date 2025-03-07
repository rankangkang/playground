/**
 * 现给定两个数组 arr1 和 arr2 ，返回一个新的数组 joinedArray 。两个输入数组中的每个对象都包含一个 id 字段。
 * joinedArray 是一个通过 id 将 arr1 和 arr2 连接而成的数组。joinedArray 的长度应为唯一值 id 的长度。返回的数组应按 id 升序 排序。
 * 如果一个 id 存在于一个数组中但不存在于另一个数组中，则该对象应包含在结果数组中且不进行修改。
 * 如果两个对象共享一个 id ，则它们的属性应进行合并：
 * 如果一个键只存在于一个对象中，则该键值对应该包含在对象中。
 * 如果一个键在两个对象中都包含，则 arr2 中的值应覆盖 arr1 中的值。
 */

/**
 * 排序，然后按照合并两个有序数组的方式合并
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
let join = function (arr1, arr2) {
  arr1.sort((a, b) => a.id - b.id)
  arr2.sort((a, b) => a.id - b.id)

  const res = []
  const pushItem = (item) => {
    if (!res.length) {
      res.push(item)
      return
    }
    if (res[res.length - 1].id === item.id) {
      Object.assign(res[res.length - 1], item)
    } else {
      res.push(item)
    }
  }

  let i = 0
  let j = 0
  while (i < arr1.length && j < arr2.length) {
    const item1 = arr1[i]
    const item2 = arr2[j]
    if (item1.id === item2.id) {
      const item = Object.assign({}, item1, item2)
      pushItem(item)
      i++
      j++
    } else if (item1.id < item2.id) {
      pushItem(item1)
      i++
    } else {
      pushItem(item2)
      j++
    }
  }

  if (i < arr1.length) {
    res.push(...arr1.slice(i))
  }
  if (j < arr2.length) {
    res.push(...arr2.slice(j))
  }

  return res
}

// 或者增加一个 hash map，遍历两个数组后对结果进行排序
