declare type Fiber = {
  type: string
  props: any
  dom: any
  alternate: any
  effectTag: string

  parent: Fiber
  child: Fiber
  sibling: Fiber
}

type SimpleReact = {
  useState<T>(initial: T): [T, (nextState: T | ((state: T) => T)) => void]
  render(element: any, container: HTMLElement): void
}

declare function createApp(): SimpleReact

declare function createElement(type: string, props: any, ...children: any[]): any

export { createApp, createElement }
