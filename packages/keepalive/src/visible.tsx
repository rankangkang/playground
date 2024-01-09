import {
  memo,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  Fragment,
} from 'react'
import { createPortal } from 'react-dom'

type ID = string | number

type RegisterFunc = (id: ID, children: ReactNode) => void
type ActivateFunc = (id: ID) => () => void

type ContextType = {
  regist: RegisterFunc
  activate: ActivateFunc
}

type AliveScopeProps = {
  children: ReactNode
}

type KeepAliveProps = {
  id: ID
  children: ReactNode
}

// 创建 keep-alive
export function createVisibleAlive() {
  const CONTEXT = createContext<ContextType>({
    regist(id, children) {
      console.log(id, children)
    },
    activate(id) {
      console.log('active', id)
      return () => {
        console.log('deactive', id)
      }
    },
  })

  return {
    AliveScope: memo(AliveScope),
    KeepAlive: memo(KeepAlive),
  }

  // 最外层的 provider
  function AliveScope(props: AliveScopeProps) {
    const [state, setState] = useState<Map<ID, ReactNode>>(new Map())
    const [containers, setContainers] = useState<Map<ID, HTMLElement>>(new Map())
    const root = useRef<HTMLDivElement>(null)
    // const [activeIds, setActiveIds] = useState<ID[]>([])

    // 使用 map 存储节点
    const regist = useCallback(
      (id: ID, children: ReactNode) => {
        if (state.has(id)) {
          // 已存在
          setState(state)
        } else {
          const nextState = new Map([...state])
          nextState.set(id, children)
          setState(nextState)

          // 创建 div
          const container = document.createElement('div')
          container.setAttribute('class', 'keep-alive')
          container.setAttribute('id', String(id))
          const nextC = new Map([...containers])
          nextC.set(id, container)
          setContainers(nextC)
        }
      },
      [state, containers],
    )

    const get = useCallback(
      (id: ID) => {
        return {
          el: containers.get(id)!,
          node: state.get(id)!,
        }
      },
      [containers, state],
    )

    const activate = useCallback((id: ID) => {
      if (containers.has(id)) {
        containers.get(id)!.style.display = 'unset'
      }
      // deactivate
      return () => {
        if (containers.has(id)) {
          containers.get(id)!.style.display = 'none'
        }
      }
    }, [containers])

    useEffect(() => {
      containers.forEach((el, id) => {
        if (!root.current?.contains(el)) {
          root.current?.appendChild(el)
        }
      })
    }, [containers])

    return (
      <CONTEXT.Provider value={{ regist, activate }}>
        {props.children}
        <div className="alive-root" ref={root}>
          {Array.from(state).map(([id, node]) => {
            const container = containers.get(id)
            return createPortal(node, container!)
          })}
        </div>
      </CONTEXT.Provider>
    )
  }

  // keep-alive 组件
  function KeepAlive(props: KeepAliveProps) {
    const { regist, activate } = useContext(CONTEXT)

    useEffect(() => {
      regist(props.id, props.children)
      const deactive = activate(props.id)
      return () => {
        deactive()
      }
    }, [regist, activate, props.id])

  return <Fragment />
  }
}
