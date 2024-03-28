// 获取防抖值，每次防抖值改变，触发重渲染
function useDebounceValue(value, delay = 0) {
  const [v, setV] = useState()
  const timer = useRef()

  useEffect(() => {
    timer.current = setTimeout(() => {
      setV(value)
    }, delay)
    return () => {
      clearTimeout(timer.current)      
    }
  }, [value, delay])

  return v
}

// 获取防抖的值，防抖值改变不触发重渲染
function useDebouncedValue(value, delay) {
  const [v, setV] = React.useState()

  const run = useMemo(() => {
    let timer = null
    let result
    return function(arg) {
      clearTimeout(timer)

      timer = setTimeout(() => {
        result = arg
      }, delay)

      return result
    }
  }, [delay])

  useEffect(() => {
    setV(run(value))
  }, [run, value])

  return v
}
