// 创建元素，类似 React.createElement，提供给 Babel 转换 jsx
export function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : createTextElement(child),
      ),
    },
  }
}

// 创建text节点
function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

// 根据fiber创建dom
function createDom(fiber) {
  const dom =
    fiber.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(fiber.type)

  // 创建完成，更新属性
  updateDom(dom, {}, fiber.props)

  return dom
}

// 更新 dom
function updateDom(dom, prevProps, nextProps) {
  // 1. 移除旧的事件
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2)
      dom.removeEventListener(eventType, prevProps[name])
    })

  // 2. 移除旧属性
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = ''
    })

  // 3. 设置新属性
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = nextProps[name]
    })

  // 4. 设置新的事件
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2)
      dom.addEventListener(eventType, nextProps[name])
    })

  function isEvent(key) {
    return key.startsWith('on')
  }
  function isProperty(key) {
    return key !== 'children' && !isEvent(key)
  }
  function isNew(prev, next) {
    return (key) => prev[key] !== next[key]
  }
  function isGone(prev, next) {
    return (key) => !(key in next)
  }
}

export function createApp() {
  let nextUnitOfWork = null
  /** current tree 根节点 */
  let currentRoot = null
  /** workInProgress tree 根节点 */
  let wipRoot = null
  let deletions = null

  let wipFiber = null
  let hookIndex = null

  // commitRoot，将 wip tree 设置为 current tree，同时执行 commit 阶段
  function commitRoot() {
    deletions.forEach(commitWork)
    commitWork(wipRoot.child)
    // wip tree 与 current tree 交替工作，这里将 wip tree 设置为 current tree
    currentRoot = wipRoot
    // wip 过程完成，置为空，中断 requestIdleCallback(workLoop) 所做的工作
    wipRoot = null
  }

  // 根据 current tree 的 dom 属性，开始更新 dom
  function commitWork(fiber) {
    if (!fiber) {
      return
    }

    let domParentFiber = fiber.parent
    while (!domParentFiber.dom) {
      domParentFiber = domParentFiber.parent
    }
    const domParent = domParentFiber.dom

    if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null) {
      domParent.appendChild(fiber.dom)
    } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
      updateDom(fiber.dom, fiber.alternate.props, fiber.props)
    } else if (fiber.effectTag === 'DELETION') {
      commitDeletion(fiber, domParent)
    }

    commitWork(fiber.child)
    commitWork(fiber.sibling)
  }

  function commitDeletion(fiber, domParent) {
    if (fiber.dom) {
      try {
        // ! 需要移除的节点可能不是子节点
        domParent.removeChild(fiber.dom)
      } catch (error) {}
    } else {
      commitDeletion(fiber.child, domParent)
    }
  }

  // * 时间分片核心，react 现在使用的是 schedular，实现效果与 requestIdleCallback 类似
  function workLoop(deadline) {
    let shouldYield = false
    while (nextUnitOfWork && !shouldYield) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
      // * 查看是否还有剩余时间，有则执行下一个 fiber 单元，没有则退出控制权
      shouldYield = deadline.timeRemaining() < 1
    }

    // fiber 更新完成，执行 commit 阶段
    if (!nextUnitOfWork && wipRoot) {
      commitRoot()
    }

    requestIdleCallback(workLoop)
  }

  // 处理 fiber，返回下一个待处理的 fiber
  // 这里决定了处理顺序：先处理子节点，再处理兄弟节点，最后处理父节点
  function performUnitOfWork(fiber) {
    const isFunctionComponent = fiber.type instanceof Function
    if (isFunctionComponent) {
      updateFunctionComponent(fiber)
    } else {
      updateHostComponent(fiber)
    }
    if (fiber.child) {
      return fiber.child
    }
    let nextFiber = fiber
    while (nextFiber) {
      if (nextFiber.sibling) {
        return nextFiber.sibling
      }
      nextFiber = nextFiber.parent
    }
  }

  // 更新函数组件
  function updateFunctionComponent(fiber) {
    wipFiber = fiber
    hookIndex = 0
    wipFiber.hooks = []
    // 取得其返回的 element，对 element 进行协调
    const children = [fiber.type(fiber.props)]
    reconcileChildren(fiber, children)
  }

  // 更新 element 节点，即 div、p、span 等
  function updateHostComponent(fiber) {
    if (!fiber.dom) {
      fiber.dom = createDom(fiber)
    }
    reconcileChildren(fiber, fiber.props.children)
  }

  // 协调过程，其实就是 diff 算法，通过 fiber node 与 ReactElement（jsx 描述的 dom 结构）进行比对，找到最小的更新路径
  // workInProgress tree 其实为 current tree 的 alternate 属性指向的树/节点
  function reconcileChildren(wipFiber, elements) {
    let index = 0
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child
    let prevSibling = null

    while (index < elements.length || oldFiber != null) {
      const element = elements[index]
      let newFiber = null

      const sameType = oldFiber && element && element.type === oldFiber.type
      if (sameType) {
        newFiber = {
          type: oldFiber.type,
          props: element.props,
          dom: oldFiber.dom,
          parent: wipFiber,
          alternate: oldFiber,
          effectTag: 'UPDATE',
        }
      }
      if (element && !sameType) {
        newFiber = {
          type: element.type,
          props: element.props,
          dom: null,
          parent: wipFiber,
          alternate: null,
          effectTag: 'PLACEMENT',
        }
      }
      if (oldFiber && !sameType) {
        oldFiber.effectTag = 'DELETION'
        deletions.push(oldFiber)
      }

      if (oldFiber) {
        oldFiber = oldFiber.sibling
      }

      if (index === 0) {
        wipFiber.child = newFiber
      } else if (element) {
        prevSibling.sibling = newFiber
      }

      prevSibling = newFiber
      index++
    }
  }

  return {
    render(element, container) {
      // 初始渲染，current tree 为空，创建一个 wip tree 根节点，开始 reconcile 过程构建 wip tree
      wipRoot = {
        dom: container,
        props: {
          children: [element],
        },
        alternate: currentRoot,
      }
      deletions = []
      nextUnitOfWork = wipRoot

      // 开始渲染
      requestIdleCallback(workLoop)
    },
    useState(initial) {
      // current tree fiber hooks
      const oldHook =
        wipFiber.alternate && wipFiber.alternate.hooks && wipFiber.alternate.hooks[hookIndex]

      const hook = {
        // 有值则取值，没有则取初始值
        state: oldHook ? oldHook.state : typeof initial === 'function' ? initial() : initial,
        queue: [],
      }

      // 上一次更新 比如 setState 这些等等，放入 queue 中，这里从 queue 离取出来，执行更新状态
      const nextStates = oldHook ? oldHook.queue : []
      nextStates.forEach((nextState) => {
        hook.state = typeof nextState === 'function' ? nextState(hook.state) : nextState
      })

      const setState = (state) => {
        // 把更新值的操作压入队列，后续按顺序更新 state，模拟批量更新的情况，如
        // setState(1)
        // setSTate(2)
        hook.queue.push(state)
        // 更新 workInProgress tree（从 current tree 复制而来）
        wipRoot = {
          dom: currentRoot.dom,
          props: currentRoot.props,
          alternate: currentRoot,
        }
        // 触发重新渲染（workLoop 一直由 requestIdleCallback 调度着，一帧至少一次）
        nextUnitOfWork = wipRoot
        deletions = []
      }

      // 把 hook 放到 当前正在处理的 fiber 的 hooks 下，React 实现的是放到 memorizedState
      wipFiber.hooks.push(hook)
      hookIndex++
      return [hook.state, setState]
    },
  }
}
