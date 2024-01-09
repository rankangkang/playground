import { useEffect, useState } from 'react'
// import './App.css'
import { AliveScope, KeepAlive } from '@pg/keepalive'

function App() {
  const [d1, setD1] = useState<boolean>(true)

  return (
    <AliveScope>
      helloworld
      <h1>helloworld</h1>
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
        <KeepAlive id="count">
          <Count />
        </KeepAlive>
      )}
    </AliveScope>
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
