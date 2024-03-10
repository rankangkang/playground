type Listener = (...args: any[]) => any

interface ListenerRecorder {
  once: boolean
  listener: Listener
}