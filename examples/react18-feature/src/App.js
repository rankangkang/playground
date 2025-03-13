import React, { useState, useTransition, useEffect } from 'react'
import { flushSync } from 'react-dom'
import './style.css'

import Pythagoras from './Pythagoras'

function App() {
  const svg = {
    width: 1280,
    height: 600,
  }
  const baseWidth = 80
  const heightFactor = 0.4
  const maxTreeSize = 22

  // we split state in two so we can update
  // visuals and inputs separately
  const [treeSizeInput, setTreeSizeInput] = useState(8)
  const [treeSize, setTreeSize] = useState(8)

  const [treeLeanInput, setTreeLeanInput] = useState(0)
  const [treeLean, setTreeLean] = useState(0)
  const [isLeaning, startLeaning] = useTransition()

  const [enableStartTransition, setEnableStartTransition] = useState(false)
  const [enableSlowdown, setEnableSlowdown] = useState(false)
  const [enableFlushSync, setEnableFlushSync] = useState(false)

  // 验证自动批处理
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(false)

  function changeTreeSize(event) {
    const value = Number(event.target.value)
    setTreeSizeInput(value) // update input

    if (enableStartTransition) {
      // 标记 setTreeSize 为低优先级的更新
      React.startTransition(() => {
        setTreeSize(value)
      })
    } else {
      setTreeSize(value)
    }
  }

  function changeTreeLean(event) {
    const value = Number(event.target.value)
    setTreeLeanInput(value) // update input

    if (enableStartTransition) {
      // 标记 setTreeLean 为低优先级的更新
      startLeaning(() => {
        setTreeLean(value)
      })
    } else {
      setTreeLean(value)
    }
  }

  function toggleStartTransition(event) {
    setEnableStartTransition(event.target.checked)
  }

  function toggleSlowdown(event) {
    setEnableSlowdown(event.target.checked)
  }

  const toggleFlushSync = (event) => {
    setEnableFlushSync(event.target.checked)
  }

  const btnClick = () => {
    if (enableFlushSync) {
      // 以下两个更新将单独重复触发
      flushSync(() => {
        setCount(count + 1)
      })
      flushSync(() => {
        setVisible(!visible)
      })
    } else {
      // 以下两个更新会批处理，一次更新
      setCount(count + 1)
      setVisible(!visible)
    }
  }

  useEffect(() => {
    // flushSync 时，一次点击会重复执行两次
    console.log('flushSync or not re-render', enableFlushSync, count, visible)
  }, [count, visible])

  return (
    <div className="App">
      <div
        style={{
          display: 'flex',
          gap: '20px',
          flexDirection: 'row',
          padding: '20px 130px',
        }}
      >
        <div style={{ fontWeight: 'bold' }}>
          <label>
            <input
              type="checkbox"
              checked={enableStartTransition}
              onChange={toggleStartTransition}
            />
            使用 startTransition
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" checked={enableSlowdown} onChange={toggleSlowdown} />
            每个方块延时线程0.1ms
          </label>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: 130 }}>
          <label>
            让树变大
            <br />
            越大越慢
          </label>
          <input
            type="range"
            value={treeSizeInput}
            onChange={changeTreeSize}
            min="0"
            max={maxTreeSize}
            step="1"
            style={{
              transform: `rotate(-90deg) translate(-${svg.height / 2}px, -90px)`,
              width: svg.height / 2,
            }}
          />
        </div>

        <svg
          width={svg.width}
          height={svg.height}
          className={isLeaning ? 'pending' : 'done'}
          style={{
            border: '1px solid lightgray',
          }}
        >
          <Pythagoras
            enableSlowdown={enableSlowdown}
            w={baseWidth}
            h={baseWidth}
            heightFactor={heightFactor}
            lean={-treeLean}
            x={svg.width / 2 - 40}
            y={svg.height - baseWidth}
            lvl={0}
            maxlvl={treeSize}
          />
        </svg>

        <div style={{ width: 130 }}>
          <label>树的倾斜度</label>
          <input
            type="range"
            value={treeLeanInput}
            onChange={changeTreeLean}
            min="-0.5"
            max="0.5"
            step="0.05"
            style={{
              transform: `rotate(-90deg) translate(-${svg.height / 2}px, -90px)`,
              width: svg.height / 2,
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginTop: '24px',
          padding: '0 130px',
        }}
      >
        <label>
          <input
            type="checkbox"
            checked={enableFlushSync}
            onChange={toggleFlushSync}
            title="enable flushSync"
          />
          enable flushSync
        </label>
        <button
          style={{ display: 'block' }}
          onClick={btnClick}
          title="打开开发者工具查看控制台内容"
        >
          点击+1
        </button>
        <h4>count: {count}</h4>
        <h4>visible: {String(visible)}</h4>
      </div>
    </div>
  )
}

export default App
