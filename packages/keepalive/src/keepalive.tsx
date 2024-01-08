import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

type ID = string | number

type RegisterFunc = (id: ID, children: ReactNode) => HTMLElement | void

type ContextType = {
  state: Record<ID, { id: ID; children: ReactNode }>
  element: Record<ID, HTMLElement>
  regist: RegisterFunc
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
    state: {},
    element: {},
    regist(id, children) {
      console.log(id, children)
    },
  })

  return { AliveScope, KeepAlive, useActive, useDeactive, useAliveScope }

  // 最外层的 provider
  function AliveScope(props: AliveScopeProps) {
    const [state, setState] = useState<ContextType['state']>({})
    const element = useRef<ContextType['element']>({})

    const regist = useCallback((id: ID, children: ReactNode) => {
      setState((s) => {
        return {
          ...s,
          [id]: { id, children },
        }
      })

      return element.current[id]
    }, [])

    // 注册的节点被渲染到指定的元素下面

    return (
      <CONTEXT.Provider value={{ state, element: element.current, regist }}>
        {props.children}
        {/* FIXME: 如何使用 createPortal 渲染 */}
        <div className="alive-root">
          {Object.values(state).map(({ id, children }) => (
            <div
              className="alive-keeper"
              key={id}
              ref={(el) => {
                element.current[id] = el as HTMLElement
              }}
            >
              {children}
            </div>
          ))}
        </div>
      </CONTEXT.Provider>
    )
  }

  // keep-alive 组件
  function KeepAlive(props: KeepAliveProps) {
    const { regist } = useContext(CONTEXT)
    const keeperRef = useRef<HTMLDivElement>()

    useLayoutEffect(() => {
      try {
        const el = regist(props.id, props.children) as HTMLElement
        if (el) {
          keeperRef.current?.appendChild(el)
        }
      } catch (error) {
        console.log(error)
      }
    }, [])

    return (
      <div
        className="keep-alive"
        ref={(el) => {
          keeperRef.current = el!
        }}
      ></div>
    )
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
