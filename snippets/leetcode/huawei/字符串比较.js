/**
 *
 * @param {string} s1
 * @param {string} s2
 */
function compareString(s1, s2) {
  let i = 0
  const maxLen = Math.max(s1.length, s2.length)
  while (i < maxLen) {
    const ch1 = s1.charAt(i)
    const ch2 = s2.charAt(i)
    if (ch1 && !ch2) {
      return 1
    }
    if (ch2 && !ch1) {
      return -1
    }

    if (ch1 > ch2) {
      return 1
    }
    if (ch1 < ch2) {
      return -1
    }

    // 相等
    i++
  }

  return 0
}

console.log(
  ['cap', 'to', 'cat', 'card', 'two', 'too', 'up', 'boat', 'boot', 'AA', 'Aa'].sort(compareString),
)
