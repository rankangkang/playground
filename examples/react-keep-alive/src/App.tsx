import { useState } from 'react'
import { AliveScope, KeepAlive, useAliveController } from '@pg/keepalive'

function App() {
  return (
    <AliveScope>
      <Playground />
    </AliveScope>
  )
}

function Playground() {
  const [domCounts, setDomCounts] = useState<number[]>([])
  const { dropAllScope } = useAliveController()

  return (
    <>
      <button
        onClick={() => {
          setDomCounts([...domCounts, Date.now()])
        }}
      >
        新增 dom count 组件
      </button>
      <button onClick={() => {
        dropAllScope()
      }} style={{ margin: 12 }}>drop all</button>
      <br />
      {domCounts.map((dc) => {
        return <DomCount id={dc} />
      })}
    </>
  )
}

function DomCount(props: { id: number | string }) {
  const [d, setD] = useState<boolean>(true)
  const { dropScope } = useAliveController()

  return (
    <div style={{ border: '1px solid #fff', borderRadius: 5, margin: "16px 0" }}>
      <button
        onClick={() => {
          setD((d) => {
            return !d
          })
        }}
      >
        switch with keep alive
      </button>
      <button
        onClick={() => {
          dropScope(props.id)
        }}
      >
        drop scope {props.id}
      </button>
      {d && (
        <KeepAlive id={props.id}>
          <Count />
        </KeepAlive>
      )}
    </div>
  )
}

function Count() {
  const [count, setCount] = useState(0)

  return (
    <div className="count">
      <div style={{ padding: 12 }}>count: {count}</div>
      <button
        onClick={() => {
          setCount((c) => c - 1)
        }}
      >
        minum count
      </button>
      <button
        onClick={() => {
          setCount((c) => c + 1)
        }}
      >
        plus count
      </button>
    </div>
  )
}

export default App
