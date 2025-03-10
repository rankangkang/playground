# 算法思想备忘

## 动态规划

see 👉🏻 <https://labuladong.online/algo/essential-technique/dynamic-programming-framework-2/>

动态规划说到底就是穷举，关键在于如何更加聪明地穷举，明确「状态」-> 明确「选择」 -> 定义 dp 数组/函数的含义。

示例如：

- [最长递增子序列](./最长递增子序列.js)
- [零钱兑换](./零钱兑换.js)
- [斐波那契](./斐波那契数.js)

## bfs 广度优先搜索

see 👉🏻 <https://leetcode.cn/problems/open-the-lock/solutions/219909/wo-xie-liao-yi-tao-bfs-suan-fa-kuang-jia-jian-dao-/>

问题的本质就是让你在一幅「图」中找到从起点 start 到终点 target 的最近距离，这个例子听起来很枯燥，但是 BFS 算法问题其实都是在干这个事儿.
一般来说，bfs 有一个核心数据结构 queue 队列，用于存放后面将要访问的节点，若存在可能会走回头路的情况，可能还需要一个额外的 set 来存储已经走过的节点，防止无限循环；对于图来说，这个 set 是必须的，对于二叉树这种没有子节点到父节点的指针的，不会走回头路，也就不需要这个 set

示例如：

- [二叉树最小深度](./二叉树最小深度.js)
- [打开转盘锁](./打开转盘锁.js)

## dfs 深度优先搜索

see 👉🏻 <https://leetcode.cn/problems/restore-ip-addresses/solutions/366627/shou-hua-tu-jie-huan-yuan-dfs-hui-su-de-xi-jie-by-/>

和 bfs 依赖“队列”不同，dfs 依赖“栈”，其中的递归函数其实也是一个“栈”——“调用栈”，满足先入后出的理念。

示例如:

- [复原 IP 地址](./复原IP地址.js)
