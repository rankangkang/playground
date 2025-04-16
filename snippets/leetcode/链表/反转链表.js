/**
 * tag: 简单
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let reverseList = function (head) {
  if (!head) {
    return head
  }

  const [nextHead] = reverse(head)
  return nextHead

  /**
   * @param {ListNode} node
   * @returns {[ListNode, ListNode]}
   */
  function reverse(node) {
    // 只剩一个节点，直接返回头尾
    if (!node.next) {
      return [node, node]
    }

    const [nextHead, nextTail] = reverse(node.next)

    // 将当前头节点插到尾部
    nextTail.next = node
    node.next = null
    return [nextHead, node]
  }
}

/**
 * 迭代写法
 * @param {ListNode} head
 * @returns {ListNode}
 */
function reverseList2(head) {
  if (!head) {
    return head
  }

  let pin = { next: null }
  // 获取 next
  let curr = head.next
  // 将头结点设为尾节点
  pin.next = head
  pin.next.next = null

  while (curr) {
    const next = curr.next
    // 将当前节点插入为头结点
    curr.next = pin.next
    pin.next = curr
    // 操作下一节点
    curr = next
  }

  return pin.next
}
