/**
 * tag: 中等
 * 两两交换链表中的节点
 * 每两个交换即可
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let swapPairs = function (head) {
  if (!head || !head.next) {
    return head
  }

  const nextHead = swapPairs(head.next.next)
  // 交换
  let temp1 = head
  let temp2 = head.next
  temp2.next = temp1
  temp1.next = nextHead
  return temp2
}
