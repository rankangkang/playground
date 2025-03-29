# 算法思想备忘

## 动态规划

see 👉🏻 <https://labuladong.online/algo/essential-technique/dynamic-programming-framework-2/>

动态规划说到底就是穷举，关键在于如何更加聪明地穷举，明确「状态」-> 明确「选择」 -> 定义 dp 数组/函数的含义。

示例如：

- [最长递增子序列](./最长递增子序列.js)
- [零钱兑换](./零钱兑换.js)
- [斐波那契](./斐波那契数.js)
- 二维 dp 数组[最长公共子序列](./最长公共子序列.js)

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

## 单调栈

单调栈即满足单调性的栈结构，即栈顶到栈底单调递增或递减。
通常是在满足栈的单调性情况下，对栈进行操作，在此期间记录结果。

```
insert x
while !sta.empty() && sta.top()<x
    sta.pop()
sta.push(x)
```

如：

- [每日温度](./每日温度.js)
- [商品折扣后的最终价格](./商品折扣后的最终价格.js)

see 👇🏻

- <https://www.bilibili.com/video/BV1VN411J7S7/?vd_source=65fb9f3843e1bff5d8aa43a2b372abf3>
- <https://leetcode.cn/discuss/post/3579480/ti-dan-dan-diao-zhan-ju-xing-xi-lie-zi-d-u4hk/>

## 滑动窗口

滑动窗口分为定长与非定长两种，主要思路都是通过窗口滑动计算，计算下一个窗口的值，这些值与滑入滑出窗口的值有关。

如：

- [无重复字符的最长子串](./无重复最长子串.js)
- [每个字符最多出现两次的最长子字符串](./每个字符最多出现两次的最长子字符串.js)

see 👉🏻 <https://leetcode.cn/discuss/post/3578981/ti-dan-hua-dong-chuang-kou-ding-chang-bu-rzz7/>

## 快排 partition

快速排序的精髓是选择信标分组，分组的精髓是 partition 方法。
非原地的 partition 非常简单，遍历一次，将比信标大的放一个数组，比信标小的放另外一个数组，拼接起来即可。
原地 partition 就有点难度了，我从来没记住过😂

```js
function partition(arr, low = 0, high = arr.length - 1) {
  const pivot = arr[high]
  // i 永远指向较小区（相对 pivot 的边界）
  let i = low - 1

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      // 从左到右扫描，出现比信标小的就放到较小区里去
      i += (1)[(arr[i], arr[j])] = [arr[j], arr[i]]
    }
  }

  // 最后基准归位
  ;[arr[i + 1], arr[high]] = [arr[hight], arr[i + 1]]
  return i + 1
}
```

关键点：

- i 永远指向较小区最后一个元素的位置
- 最后一步交换让基准回到正确位置
- 每次遇到小元素，i 先扩地盘，较小区再把属于自己的元素交换过来
