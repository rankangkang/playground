/* eslint-disable */

function replaceString(input, target) {
  const index = findIndex(input, target)
  if (index < 0) {
    return input
  }

  let r
  if (index === 0) {
    r = input.slice(target.length)
  } else {
    r = input.slice(0, index) + input.slice(index + target.length)
  }

  return replaceString(r, target)
}

function findIndex(input, target) {
  const targetLen = target.length
  const end = input.length - targetLen

  for (let i = 0; i < end; i++) {
    let match = true
    for (j = 0; j < targetLen; j++) {
      if (input[i + j] !== target[j]) {
        match = false
        break
      }
    }
    if (match) {
      return i
    }
  }

  return -1
}

// 可以用 String.prototype.replace + 正则 优化
console.log(replaceString('aaacccb', 'ac'))
