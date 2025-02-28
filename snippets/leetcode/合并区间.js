/**
 * tag: 中等
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
 * 请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
 */

/**
 * 先排序再合并
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0])
  return intervals.reduce((res, item) => {
    if (!res.length) {
      res.push(item)
      return res
    }

    const [start, end] = item;
    const [, rEnd] = res[res.length - 1]
    // rStart 肯定小于或等于 start，因为排过序
    if (start <= rEnd) {
      if (end > rEnd) {
        res[res.length - 1][1] = end;
      }
    } else {
      res.push(item)
    }
    return res;
  }, [])
};