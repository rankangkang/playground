const fs = require('fs')
const path = require('path')

const _parser = require('@babel/parser')
const _traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')

const parser = {
  getAst: (path) => {
    const content = fs.readFileSync(path, 'utf-8')
    return _parser.parse(content, { sourceType: 'module' })
  },

  // 根据 ast 获取依赖
  getDeps: (ast, filename) => {
    const deps = {}
    // 遍历 ast，取得依赖并存入 deps
    _traverse(ast, {
      // import 语句
      ImportDeclaration({ node }) {
        const dirname = path.dirname(filename)
        // 组装依赖的完整路径
        const filepath = './' + path.join(dirname, node.source.value)
        deps[node.source.value] = filepath
      },
    })

    return deps
  },

  // 从 ast 获取 code
  getCode: (ast) => {
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env'],
    })
    return code
  },
}

class Compiler {
  constructor(options) {
    // 从配置获取 entry 和 output
    const { entry, output } = options
    this.entry = entry
    this.output = output
    // module 模块列表
    this.modules = []
  }

  // 开始编译
  run() {
    const entryInfo = this.build(this.entry)
    this.modules.push(entryInfo)
    this.modules.forEach(({ deps }) => {
      // 递归解析出所有依赖项信息
      if (deps) {
        for (const depIdx in deps) {
          const dep = deps[depIdx]
          this.modules.push(this.build(dep))
        }
      }
    })

    // 生成依赖关系映射
    const depMap = this.modules.reduce((r, mod) => {
      return {
        ...r,
        [mod.fileName]: {
          deps: mod.deps,
          code: mod.code,
        },
      }
    }, {})

    this.generate(depMap)
  }

  // 构建一个 js 模块
  build(fileName) {
    const ast = parser.getAst(fileName)
    const deps = parser.getDeps(ast, fileName)
    const code = parser.getCode(ast)
    return {
      fileName,
      deps,
      code,
    }
  }

  // 重写 require，输出 bundle
  generate(depMap) {
    const filePath = path.join(this.output.path, this.output.filename)
    // magic code，模拟 require 和 exports
    const bundle = `(function(graph) {
  function require(module) {
    function localRequire(relativePath) {
      return require(graph[module].deps[relativePath]);
    }
    var exports = {};
    (function(require, exports, code) {
      eval(code);
    })(localRequire, exports, graph[module].code);
    return exports;
  }
  require('${this.entry}');
})(${JSON.stringify(depMap, null, 2)})`
    fs.writeFileSync(filePath, bundle, 'utf-8')
  }
}

module.exports = Compiler
