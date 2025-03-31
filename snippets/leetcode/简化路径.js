/**
 * @param {string} path
 * @return {string}
 */
let simplifyPath = function (path) {
  const stack = []
  let temp = ''
  for (let i = 0; i < path.length; i++) {
    const char = path[i]
    if (char === '/') {
      if (temp.length) {
        if (temp === '..') {
          stack.pop()
        } else if (temp !== '.') {
          // 不处理 . 代表当前目录
          stack.push(temp)
        }
      }

      temp = ''
    } else if (char === '.') {
      temp += '.'
    } else {
      temp += char
    }
  }

  // 处理最后一个字符
  if (temp.length) {
    if (temp === '..') {
      stack.pop()
    } else if (temp !== '.') {
      // 不处理 . 代表当前目录
      stack.push(temp)
    }
  }

  return '/' + stack.join('/')
}

console.log(simplifyPath('/.../a/../b/c/../d/./'))
console.log(simplifyPath('/a//b////c/d//././/..'))
