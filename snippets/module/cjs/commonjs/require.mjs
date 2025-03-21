import path from 'node:path'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const thisPath = path.dirname(fileURLToPath(import.meta.url))
const moduleCache = new Map()

export function require(moduleId) {
  // moduleId 实际上就是文件的绝对路径，这里可能存在一些 moduleId 转化，如把 相对路径转绝对路径、npm 包名转为路径等
  // 这里假设所有文件都是在同一目录下平铺
  moduleId = path.resolve(thisPath, moduleId)
  if (moduleCache.has(moduleId)) {
    // 已被加载的模块，直接进行返回
    return moduleCache.get(moduleId)
  }

  // 包裹模块的方法
  function _require(exports, require, module, __filename, __dirname) {
    // your code here
    // 这里我使用 readfile 直接读取文件内容了
    const __code__ = readFileSync(moduleId, { encoding: 'utf-8' })
    eval(__code__)
  }

  var module = {
    exports: {},
  }
  var exports = module.exports
  var __filename = moduleId
  var __dirname = path.dirname(moduleId)

  // 执行这个方法，取得 module.exports
  _require.apply(exports, [exports, require, module, __filename, __dirname])

  moduleCache.set(moduleId, module.exports)

  return module.exports
}

;(function () {
  const greet = require('./greet.js')
  greet() // Hello World!
  greet('hey') // Hey, there.
})()
