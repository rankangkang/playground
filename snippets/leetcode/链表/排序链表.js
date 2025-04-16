/**
 * tag: 中等
 * 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
 * 采用归并排序算法，先将链表分割为 N 个递增链表，然后再将 N 个递增链表合并为一个递增链表。
 * 归并排序的时间复杂度为 O(NlogN)，空间复杂度为 O(N)。
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
let sortList = function (head) {
  if (!head || !head.next) {
    return head
  }

  const lists = []
  let tempHead = head
  let prev = head
  let curr = head.next
  while (curr) {
    if (curr.val < prev.val) {
      // 当前节点小于之前的节点，分割
      prev.next = null
      lists.push(tempHead)
      // 重新开始，头结点为当前节点
      tempHead = curr
      prev = curr
    }

    // 当前节点大于之前的节点，继续遍历
    prev = curr
    curr = curr.next
  }

  if (tempHead) {
    lists.push(tempHead)
  }

  return mergeKLists(lists)
}

function mergeKLists(lists) {
  if (lists.length <= 1) {
    return lists[0] || null
  }

  if (lists.length > 2) {
    const mid = lists.length >> 1
    return merge2Lists(mergeKLists(lists.slice(0, mid)), mergeKLists(lists.slice(mid)))
  }

  return merge2Lists(lists[0], lists[1])
}

function merge2Lists(l1, l2) {
  if (!l1 || !l2) {
    return l2 || l1
  }

  if (l1.val <= l2.val) {
    l1.next = merge2Lists(l1.next, l2)
    return l1
  } else {
    l2.next = merge2Lists(l1, l2.next)
    return l2
  }
}
