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
  let currentRoot = null
  let wipRoot = null
  let deletions = null

  let wipFiber = null
  let hookIndex = null

  function commitRoot() {
    deletions.forEach(commitWork)
    commitWork(wipRoot.child)
    currentRoot = wipRoot
    wipRoot = null
  }

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

  function updateFunctionComponent(fiber) {
    wipFiber = fiber
    hookIndex = 0
    wipFiber.hooks = []
    const children = [fiber.type(fiber.props)]
    reconcileChildren(fiber, children)
  }

  function updateHostComponent(fiber) {
    if (!fiber.dom) {
      fiber.dom = createDom(fiber)
    }
    reconcileChildren(fiber, fiber.props.children)
  }

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
      const oldHook =
        wipFiber.alternate && wipFiber.alternate.hooks && wipFiber.alternate.hooks[hookIndex]
      const hook = {
        state: oldHook ? oldHook.state : typeof initial === 'function' ? initial() : initial,
        queue: [],
      }

      const states = oldHook ? oldHook.queue : []
      states.forEach((state) => {
        hook.state = typeof state === 'function' ? state(hook.state) : state
      })

      const setState = (state) => {
        hook.queue.push(state)
        wipRoot = {
          dom: currentRoot.dom,
          props: currentRoot.props,
          alternate: currentRoot,
        }
        nextUnitOfWork = wipRoot
        deletions = []
      }

      wipFiber.hooks.push(hook)
      hookIndex++
      return [hook.state, setState]
    },
  }
}
