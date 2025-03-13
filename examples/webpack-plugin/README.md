# README

## quick start 一个 webpack react ts 项目

1. 初始化项目：`pnpm init`
2. 安装 React、React-DOM、typescript、webpack
3. 初始化 ts 配置
4. 编写简单的 React 入口代码，以及 HTML 模板
5. 初始化 Webpack 配置
   1. 安装 babel-loader、@babel/core、@babel/preset-react、@babel/preset-typescript
   2. 书写配置文件，如 `scripts/webpack.dev.js`
6. 配置启动命令：如 package.json scripts 属性内容
7. 若要处理其他文件，如 css、less 等，需添加其他类型的 loader

## 问题验证

### 1. 多个同类型的插件注册到 webpack 后，其执行顺序是怎样的？

Webpack 配置文件中插件的声明顺序决定了它们的注册顺序。
先注册的插件会先绑定到钩子（Hook）上，因此同一事件触发时，先注册的插件的回调会先执行。

```js
// webpack.config.js
module.exports = {
  plugins: [
    new PluginA(), // 先注册 → 先执行
    new PluginB(), // 后注册 → 后执行
  ],
}
```
