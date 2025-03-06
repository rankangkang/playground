/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  if (lists.length === 0) {
    return null
  }

  if (lists.length === 1) {
    return lists[0]
  }

  if (lists.length > 2) {
    // 开始递归
    const mid = lists.length >> 1
    return merge2Lists(mergeKLists(lists.slice(0, mid)), mergeKLists(lists.slice(mid)))
  }

  return merge2Lists(lists[0], lists[1])
};

/**
 * 合并两个升序链表，采用递归的方式
 * https://leetcode.cn/problems/merge-two-sorted-lists/solutions/103891/yi-kan-jiu-hui-yi-xie-jiu-fei-xiang-jie-di-gui-by-/
 * @param {*} l1 
 * @param {*} l2 
 * @returns 
 */
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

/**
 * 迭代的方式合并两个升序链表
 * @param {*} l1 
 * @param {*} l2 
 * @returns 
 */
function merge2ListsIterate(l1, l2) {
  const preHead = new ListNode(Number.NEGATIVE_INFINITY)
  // 存储之前的引用，用于后续使用
  let prev = preHead;
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      // l1 放在前
      prev.next = l1
      l1 = l1.next
    } else {
      prev.next = l2
      l2 = l2.next
    }

    // 移动 prev
    prev = prev.next
  }

  // 有一个或两个已经遍历完，那么直接连接后面剩余的就好
  prev.next = !!l1 ? l1 : l2

  return preHead.next
}
