/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
let removeNthFromEnd = function (head, n) {
  /** @type {ListNode} */
  const pin = { next: head }
  let left = pin
  let right = pin
  for (let i = 0; i < n; i++) {
    right = right.next
  }

  while (right.next) {
    left = left.next
    right = right.next
  }
  left.next = left.next.next

  return pin.next
}
