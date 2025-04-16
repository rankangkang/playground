/**
 * tag: 中等
 * 通过一个 WeakMap 建立 hash 映射
 */
/**
 * // Definition for a _Node.
 * function _Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {_Node} head
 * @return {_Node}
 */
let copyRandomList = function (head) {
  const map = new WeakMap()

  let curr = head
  while (curr) {
    map.set(curr, new _Node(curr.val))
    curr = curr.next
  }

  // 第二次遍历，设置next和random指针
  curr = head
  while (curr) {
    const node = map.get(curr)
    node.next = map.get(curr.next) || null
    node.random = map.get(curr.random) || null
    curr = curr.next
  }

  return map.get(head) || null
}
