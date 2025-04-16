/**
 * @param {ListNode} head
 * @return {boolean}
 */
let isPalindrome = function (head) {
  let s = ''
  let node = head
  while (node) {
    s += node.val
    node = node.next
  }

  return s === s.split('').reverse().join('')
}

// 或者使用快慢指针找到中间点，然后反转链表，逐个比较
