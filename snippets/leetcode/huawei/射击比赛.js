/**
 * tag: 简单，偏应用
给定一个射击比赛成绩单
包含多个选手若干次射击的成绩分数
请对每个选手按其最高三个分数之和进行降序排名
输出降序排名后的选手ID序列
条件如下:

一个选手可以有多个射击成绩的分数 且次序不固定
如果一个选手成绩小于三个 则认为选手的所有成绩无效 排名忽略该选手
如果选手的成绩之和相等,则成绩相等的选手按照其ID降序排列
 */

/**
 *
 * @param {*} shotNum
 * @param {*} idSeq
 * @param {*} scoreSeq
 * @returns
 */

function solution(shotNum, idSeq, scoreSeq) {
  const id2ScoreMap = new Map()
  const index2IdMap = new Map()

  for (let i = 0; i < idSeq.length; i++) {
    const id = idSeq[i]
    if (!id2ScoreMap.has(id)) {
      id2ScoreMap.set(id, [])
    }
    index2IdMap.set(i, id)
  }

  for (let i = 0; i < scoreSeq.length; i++) {
    const id = index2IdMap.get(i)
    id2ScoreMap.get(id).push(scoreSeq[i])
  }

  let res = []
  id2ScoreMap.forEach((scores, id, map) => {
    if (scores.length < 3) {
      map.delete(id)
      return
    }

    scores.sort((a, b) => b - a)
    const top3Sum = scores[0] + scores[1] + scores[2]
    res.push({ id, top3Sum })
  })

  return res
    .sort((a, b) => {
      const diff = b.top3Sum - a.top3Sum
      if (diff !== 0) {
        return diff
      }

      return b.id - a.id
    })
    .map((item) => item.id)
}

console.log(
  solution(
    13,
    [3, 3, 7, 4, 4, 4, 4, 7, 7, 3, 5, 5, 5],
    [53, 80, 68, 24, 39, 76, 66, 16, 100, 55, 53, 80, 55],
  ),
)
