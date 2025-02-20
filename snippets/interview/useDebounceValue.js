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
