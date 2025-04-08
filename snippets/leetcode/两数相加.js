/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
let addTwoNumbers = function (l1, l2) {
  function addNode(n1, n2, carry = 0) {
    const sum = (n1?.val || 0) + (n2?.val || 0) + carry
    const [s, c] = [sum % 10, Math.floor(sum / 10)]
    return [s, c]
  }

  let ret = new ListNode()
  let prev = ret
  let carry = 0
  while (l1 || l2) {
    const [s, c] = addNode(l1, l2, carry)
    const node = new ListNode(s)
    prev.next = node
    prev = node
    carry = c
    l1 = l1?.next
    l2 = l2?.next
  }

  if (carry > 0) {
    prev.next = new ListNode(carry)
  }

  return ret.next
}
