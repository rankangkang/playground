import { useEffect, useState } from 'react'
// import './App.css'
import { createVisibleAlive, createDomAlive } from '@pg/keepalive'

const { AliveScope: AliveScopeVisible, KeepAlive: KeepAliveVisible } = createVisibleAlive()
const { AliveScope: AliveScopeDom, KeepAlive: KeepAliveDom, useAliveController: useAliveControllerDom } = createDomAlive()

function App() {
  const [d1, setD1] = useState<boolean>(true)

  return (
    <>
    <AliveScopeVisible>
      <h1>keepalive visible</h1>
      <button
        onClick={() => {
          setD1((d) => {
            return !d
          })
        }}
      >
        switch with keep alive
      </button>
      {d1 && (
        <KeepAliveVisible id="count">
          <Count />
        </KeepAliveVisible>
      )}
    </AliveScopeVisible>
    
    <AliveScopeDom>
      <DomCount />
    </AliveScopeDom>
    </>
  )
}

function DomCount() {
  const [d2, setD2] = useState<boolean>(true)
  const { dropScope } = useAliveControllerDom()
  return (
    <>
    <h1>keepalive dom</h1>
    <button
      onClick={() => {
        setD2((d) => {
          return !d
        })
      }}
    >
      switch with keep alive
    </button>
    <button onClick={() => {
      dropScope("count")
    }}>drop scope</button>
    {
      d2 && <KeepAliveDom id="count">
        <Count />
      </KeepAliveDom>
    }
    </>
  )
}

function Count() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('mount')
    return () => {
      console.log('unmount')
    }
  }, [])

  return (
    <div className="count">
      <p>count: {count}</p>
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
