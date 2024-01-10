import React, {
  createContext,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useContext,
  useMemo,
  useCallback,
  ReactNode,
} from 'react'

type ID = string | number
type ContextType = {
  regist: (id: ID, node: ReactNode) => Promise<HTMLElement>
  drop: (id: ID) => void
}

type AliveScopeProps = {
  children: ReactNode
}

type KeepAliveProps = {
  children: ReactNode
  id: ID
}

export function createDomAlive() {
  const CONTEXT = createContext<ContextType>({
    regist(id, node) {
      return Promise.resolve(document.body)
    },
    drop(id) {},
  })

  return { AliveScope, KeepAlive, useAliveController }

  // 缓存的虚拟DOM元素会储存在AliveScope 组件中，所以它不能被卸载
  function AliveScope(props: AliveScopeProps) {
    // state用来存储keepalive组件的id与其children
    const [state, setState] = useState<Record<ID, { id: ID; children: ReactNode }>>({})

    // ref只创建一次，用来存储子组件渲染后的实例
    const ref = useRef<Record<ID, HTMLElement>>({})

    const regist = useCallback(
      (id: ID, children: ReactNode) =>
        new Promise<HTMLElement>((resolve) => {
          // 存储KeepAlive中的id与children对应关系，用于在AliveScope中渲染
          setState((state) => ({
            ...state,
            [id]: { id, children },
          }))
          // 将渲染后的实例dom ref[id]返回KeepAlive中，便于其移动到真实需要展示的位置
          setTimeout(() => {
            // 需要等待setState渲染完拿到实例返回给子组件。
            resolve(ref.current[id] as HTMLElement)
          })
        }),
      [ref],
    )

    const drop = useCallback((id: ID) => {
      // 移除存储的状态
      setState((state) => {
        delete state[id]
        delete ref.current[id]
        return { ...state }
      })
    }, [])

    return (
      <CONTEXT.Provider value={{ regist, drop }}>
        {props.children}
        {/* 这里react对KeepAlive组件的children进行渲染，渲染完成后会被appendChild移动至其真实需要渲染的位置 */}
        <div className="alive-scope">
          {Object.values(state).map(({ id, children }) => (
            <div
              className="keeper"
              id={String(id)}
              key={id}
              ref={(node) => {
                ref.current[id] = node!
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
    const { regist } = useContext(CONTEXT)

    const ref = useRef<HTMLElement>()

    useLayoutEffect(() => {
      const init = async ({ id, children }: KeepAliveProps) => {
        // 通过 keep 函数将 KeepAlive 中的信息传递给父组件 AliveScope 处理
        // AliveScope 帮助渲染 children，并将渲染后的实例 dom realContent 返回
        const realContent = await regist(id, children)
        // 将渲染后的 realContent 移动到 KeepAlive 中展示
        if (ref.current && realContent) {
          // # core: 直接 append element，将会将对应 element 从原有位置移动至其父元素下
          ref.current?.appendChild(realContent)
        }
      }
      init(props)
    }, [props, regist])

    // keep-alive 渲染时，将 alive-root 中的节点 append 到 keep-alive 下
    return <div className="keep-alive" ref={(node) => (ref.current = node!)} />
  }

  function useAliveController() {
    const { drop } = useContext(CONTEXT)
    return {
      dropScope: drop,
    }
  }
}
