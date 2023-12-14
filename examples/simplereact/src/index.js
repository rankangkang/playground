import * as SimpleReact from '@pg/simple-react'

const app = SimpleReact.createApp()

/** @jsx SimpleReact.createElement */
function Demo() {
  const [tab, setTab] = app.useState('counter')
  const [count, setCount] = app.useState(1)

  const greet = (
    <div>
      <h1>
        helloworld
      </h1>
    </div>
  )

  const counter = (
    <div>
      <h1>
        Count: {count}
      </h1>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <button onClick={() => setCount((c) => c - 1)}>-1</button>
    </div>
  )

  return (
    <div>
      <button onClick={() => setTab('greet')}>greet</button>
      <button onClick={() => setTab('counter')}>counter</button>
      { tab === 'counter' ? counter : greet }
    </div>
  )
}

const element = <Demo />
const container = document.getElementById('root')
app.render(element, container)
