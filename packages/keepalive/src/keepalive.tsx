import {
  memo,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactPortal,
  Fragment,
  MutableRefObject,
} from 'react'
import { createPortal } from 'react-dom'

type ID = string | number

type RegisterFunc = (id: ID, children: ReactNode) => void
type GetFunc = (id: ID) => { node: ReactNode; el: HTMLElement }

type ActivateFunc = (id: ID) => () => void

type ContextType = {
  state: Map<ID, ReactNode>
  regist: RegisterFunc
  get: GetFunc
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
export function createKeepAlive() {
  const CONTEXT = createContext<ContextType>({
    state: new Map(),
    regist(id, children) {
      console.log(id, children)
    },
    get() {
      return { node: null, el: document.body }
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
    useActive,
    useDeactive,
    useAliveScope,
  }

  // 最外层的 provider
  function AliveScope(props: AliveScopeProps) {
    const [state, setState] = useState<ContextType['state']>(new Map())
    const [containers, setContainers] = useState<Map<ID, HTMLElement>>(new Map())
    const root = useRef<HTMLDivElement>(null)
    const [activeIds, setActiveIds] = useState<ID[]>([])

    // 使用 map 存储节点
    const regist = useCallback(
      (id: ID, children: ReactNode) => {
        if (state.has(id)) {
          // 已存在
          console.log(`node [${id}] has been registed`, state.get(id))
          setState(state)
        } else {
          const nextState = new Map([...state])
          nextState.set(id, children)
          console.log(`regist node [${id}]`)
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
      setActiveIds((ids) => {
        const nextIds = [...ids]
        if (!ids.includes(id)) {
          nextIds.push(id)
        }
        return nextIds
      })

      // deactivate
      return () => {
        setActiveIds((ids) => {
          return ids.filter((item) => item !== id)
        })
      }
    }, [])

    useEffect(() => {
      containers.forEach((el, id) => {
        // if (activeIds.includes(id)) {
        //   root.current?.appendChild(el)
        // } else {
        //   try {
        //     root.current?.removeChild(el)
        //   } catch (error) {}
        // }
        if (activeIds.includes(id)) {
          el.style.display = 'unset'
        } else {
          el.style.display = 'none'
        }
        if (!root.current?.contains(el)) {
          root.current?.appendChild(el)
        }
        // TODO: 移除多余 container
      })
    }, [containers, activeIds])

    return (
      <CONTEXT.Provider value={{ state, regist, get, activate }}>
        {props.children}
        <div className="alive-root" ref={root}>
          {Array.from(state).map(([id, node]) => {
            const container = containers.get(id)
            const isActive = activeIds.includes(id)
            return (
              <Keeper key={id} id={id} container={container!} active={isActive}>
                {node}
              </Keeper>
            )
          })}
        </div>
      </CONTEXT.Provider>
    )
  }

  function Keeper(props: {
    id: ID
    children?: ReactNode
    container: HTMLElement
    active?: boolean
  }) {
    // // 渲染组件
    // if (!props.active) {
    //   return (
    //     <div className="keeper" style={{ display: 'none' }}>
    //       {createPortal(props.children, props.container)}
    //     </div>
    //   )
    // }

    return createPortal(props.children, props.container)
  }

  // keep-alive 组件
  function KeepAlive(props: KeepAliveProps) {
    const { regist, activate, get } = useContext(CONTEXT)

    useEffect(() => {
      regist(props.id, props.children)
      const deactive = activate(props.id)

      return () => {
        deactive()
      }
    }, [regist, activate, props.id])

    const { el, node } = get(props.id)
    if (!el || !node) {
      return <Fragment />
    }

    return <Fragment />
  }

  // 注册 active 回调
  function useActive() {}

  // 注册 deactive 回调
  function useDeactive() {}

  // 返回 alive scope function
  function useAliveScope() {}
}

// 导出默认元素
export const { AliveScope, KeepAlive } = createKeepAlive()
