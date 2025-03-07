# react 18 feature

## React Concurrent Mode

React 18 带来了并发模式，核心是让 React 能够中断、暂停、按优先级渲染任务，从而避免长时间占用主线程导致界面卡顿。
React fiber 架构为 Concurrent Mode 提供了底层支持。
React 在更新过程中，每处理一个 fiber，都会看看有没有更高优先级的更新，如果有，当前的低优先级的更新将会被暂停，待高优先级的任务执行完成之后，再继续或重新执行，这个过程在对开发者是无感知的。

React 的状态更新可以分为两类：

- 紧急更新（Urgent updates）：比如打字、点击、拖动等，需要立即响应的行为，响应不及时会影响体验
- 过渡更新（Transition updates）：将 UI 从一个视图过渡到另一个视图。不需要即时响应，有些延迟是可以接受的。

ConcurrentMode 只是提供了可中断的能力，不能区分哪些更新会引发紧急更新，哪些会引发过渡更新。默认情况下，所有的更新都是紧急更新。
React 提供了一些 API，让开发者能够标记哪些更新是过渡更新。

- useTransition/startTransition: see [👉🏻](./src/App.js)
- useDeferredValue:
