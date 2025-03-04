class LinkedNode {
  constructor(key, value) {
    this.key = key
    this.value = value
    /**
     * @type {LinkedNode}
     */
    this.prev = null
    /**
     * @type {LinkedNode}
     */
    this.next = null
  }
}

/**
 * 使用双向链表存储队列
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;

  // 双向链表头部
  this.head = new LinkedNode();
  this.head.prev = this.head
  this.head.next = this.head

  /**
   * @type {Map<any, LinkedNode>}
   */
  this.key2Node = new Map()
};

/**
 * 移除链表内的一个 node
 * @param {LinkedNode} node 
 */
LRUCache.prototype.removeLinkedNode = function (node) {
  node.prev.next = node.next
  node.next.prev = node.prev
}

/**
 * 插入 node 到链表头部
 * @param {LinkedNode} node 
 */
LRUCache.prototype.unshiftLinkedNode = function (node) {
  // 查到 head 之后
  node.prev = this.head
  node.next = this.head.next
  // 把 head 的 next 设置为自己
  node.prev.next = node
  // 把原来第一个的 prev 设置为自己
  node.next.prev = node
}

/**
 * 获取 key 对应节点，同时将节点移动到头部
 * @param {*} key 
 * @returns 
 */
LRUCache.prototype.getLinkedNode = function (key) {
  if (!this.key2Node.has(key)) {
    // 没找到
    return null
  }

  const node = this.key2Node.get(key)
  this.removeLinkedNode(node)
  this.unshiftLinkedNode(node)
  return node
}

/** 
 * 获取值
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const node = this.getLinkedNode(key)
  return node ? node.value : -1
};

/** 
 * 设置值
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  let node = this.getLinkedNode(key)
  if (node) {
    // 值已经存在，更新值
    node.value = value
    return;
  }

  node = new LinkedNode(key, value)
  // 存到 map 内部
  this.key2Node.set(key, node)
  // 放在最上面
  this.unshiftLinkedNode(node)

  if (this.key2Node.size > this.capacity) {
    const lastNode = this.head.prev
    this.removeLinkedNode(lastNode)
    this.key2Node.delete(lastNode.key)
  }
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

