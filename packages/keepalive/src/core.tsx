import {
  createContext,
  useState,
  useLayoutEffect,
  useRef,
  useContext,
  useCallback,
  ReactNode,
  useEffect,
} from 'react'

enum AliveStatus {
  ACTIVE = 'active',
  UNACTIVE = 'unactive',
}

type ID = string | number

type ContextType = {
  register: (id: ID, node: ReactNode) => Promise<HTMLElement>
  unregister: (id: ID) => void
  drop: (id: ID) => void
  dropAll: () => void
}

type AliveScopeProps = {
  children: ReactNode
}

type KeepAliveProps = {
  children: ReactNode
  id: ID
}

export function createKeepAlive() {
  const CONTEXT = createContext<ContextType>({
    register() {
      return Promise.resolve(document.body)
    },
    drop() {},
    unregister() {},
    dropAll() {},
  })

  return { AliveScope, KeepAlive, useAliveController }

  // 缓存的虚拟DOM元素会储存在AliveScope 组件中，所以它不能被卸载
  function AliveScope(props: AliveScopeProps) {
    // state用来存储keepalive组件的id与其children
    const [state, setState] = useState<
      Record<ID, { id: ID; children: ReactNode; status: AliveStatus }>
    >({})

    // ref只创建一次，用来存储子组件渲染后的实例
    const nodes = useRef<Record<ID, HTMLElement>>({})
    // 容器根节点
    const rootRef = useRef<HTMLElement>()

    const register = useCallback(
      (id: ID, children: ReactNode) =>
        new Promise<HTMLElement>((resolve) => {
          setState((state) => ({
            ...state,
            [id]: { id, children, status: AliveStatus.ACTIVE },
          }))
          setTimeout(() => {
            resolve(nodes.current[id] as HTMLElement)
          })
        }),
      [],
    )

    // unmount 时将移出的元素 append 回来
    const unregister = useCallback((id: ID) => {
      return new Promise((resolve => {
        try {
          setState((state) => {
            const nextState = { ...state }
            if (nextState[id]) {
              nextState[id].status = AliveStatus.UNACTIVE
            }
            return nextState
          })

          setTimeout(() => {
            const node = nodes.current[id]
            if (node) {
              rootRef.current!.appendChild(node)
            }

            resolve(undefined)
          })
        } catch (error) {
          console.error(error)
        }
      }))
    }, [])

    const drop = useCallback((id: ID) => {
      setState((state) => {
        if (state[id] && state[id].status === AliveStatus.UNACTIVE) {
          delete state[id]
          setTimeout(() => delete nodes.current[id])
        }
        return { ...state }
      })
    }, [])

    const dropAll = useCallback(() => {
      setState((state) => {
        Object.keys(state).forEach((id) => {
          if (state[id] && state[id].status === AliveStatus.UNACTIVE) {
            delete state[id]
            setTimeout(() => delete nodes.current[id])
          }
        })
        return { ...state }
      })
    }, [])

    return (
      <CONTEXT.Provider value={{ register, unregister, drop, dropAll }}>
        {props.children}
        <div
          className="alive-scope"
          style={{ display: 'none' }}
          ref={(e) => {
            rootRef.current = e!
          }}
        >
          {Object.values(state).map(({ id, children }) => (
            <div
              className="keeper"
              id={String(id)}
              key={id}
              ref={(node) => {
                nodes.current[id] = node!
              }}
            >
              {children}
            </div>
          ))}
        </div>
      </CONTEXT.Provider>
    )
  }

  function KeepAlive(props: KeepAliveProps) {
    const { register, unregister } = useContext(CONTEXT)

    const ref = useRef<HTMLElement>()
    const realContentRef = useRef<any>()

    useLayoutEffect(() => {
      const init = async ({ id, children }: KeepAliveProps) => {
        // 通过 keep 函数将 KeepAlive 中的信息传递给父组件 AliveScope 处理
        // AliveScope 帮助渲染 children，并将渲染后的实例 dom realContent 返回
        const realContent = await register(id, children)
        realContentRef.current = realContent
        // 将渲染后的 realContent 移动到 KeepAlive 中展示
        if (ref.current && realContent) {
          // # core: 直接 append element，将会将对应 element 从原有位置移动至其父元素下
          ref.current?.appendChild(realContent)
        }
      }
      init(props)
    }, [])

    useEffect(() => {
      // 卸载
      return () => {
        if (realContentRef.current) {
          try {
            unregister(props.id)
          } catch (error) {}
        }
      }
    }, [])

    // keep-alive 渲染时，将 alive-root 中的节点 append 到 keep-alive 下
    return <div className="keep-alive" ref={(node) => (ref.current = node!)} />
  }

  function useAliveController() {
    const { drop, dropAll } = useContext(CONTEXT)
    return {
      dropScope: drop,
      dropAllScope: dropAll,
    }
  }
}
