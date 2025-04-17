/**
 * @param {ListNode} head
 * @return {boolean}
 */
let hasCycle = function (head) {
  // 快慢指针，若最后快慢指针相遇，则一定存在环
  let slow = head
  let fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) {
      return true
    }
  }

  return false
}
