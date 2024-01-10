# keepalive

核心内容：将 children 抽离，渲染到一个不会被卸载的组件内。

## visible-alive

通过 css display 属性控制元素显隐，达到组件不卸载的效果
会打乱 react 层级，context 上下文，合成事件冒泡会存在问题（因为元素实际上是渲染在 Provider 下而非 KeepAlive 下）

## dom-alive

通过操作 dom 实现组件不卸载的作用
通过 Provider 渲染 ReactNode 到真实 element 上，keep-alive 渲染时，将 element （append）到
