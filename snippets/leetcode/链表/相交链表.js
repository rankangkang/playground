/**
 * hash set
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
let getIntersectionNode = function (headA, headB) {
  const set = traverse(headA)
  let curr = headB
  while (curr) {
    if (set.has(curr)) {
      return curr
    }
    curr = curr.next
  }

  return null

  /**
   * @param {ListNode} node
   * @param {Set} memo
   */
  function traverse(node, memo = new Set()) {
    while (node) {
      memo.add(node)
      node = node.next
    }
    return memo
  }
}
