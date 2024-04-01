export let count = 0

export function addCount() {
  count++
}

setTimeout(() => {
  console.log('count', count)
})
