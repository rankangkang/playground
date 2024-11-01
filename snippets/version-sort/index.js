// 版本号排序
/**
 * 样例输入：versions = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']
 * 输出：['0.1.1', '0.302.1', '2.3.3', '4.3.4.5', '4.3.5']
 */

/**
 * 版本号排序
 * 从最高位开始比较，较大的在前，低位不足的补0
 * @param {string[]} versions
 * @returns {string[]}
 */
function versionSort(versions) {
  return versions.sort((va, vb) => {
    const ar = va.split('.')
    const br = vb.split('.')
    const len = Math.max(ar.length, br.length)
    for (let i = 0; i < len; i++) {
      const ta = ar[i] ? Number(ar[i]) : 0
      const tb = br[i] ? Number(br[i]) : 0
      if (ta === tb) {
        continue
      }

      return ta - tb
    }

    return 0
  })
}

console.log(versionSort(['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']))
