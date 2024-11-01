const counters = document.querySelectorAll('.counter')
const btn = document.querySelector('.btn')
const countUp = () => {
  counters.forEach((counter) => {
    const from = +counter.getAttribute('from')
    const to = +counter.getAttribute('to')
    const duration = 1000
    counter.innerText = from
    const gap = to - from
    const increment = gap / (duration / 5)
    const updateCounter = () => {
      const cur = +counter.innerText
      if (cur < to) {
        counter.innerText = `${Math.ceil(cur + increment)}`
        setTimeout(updateCounter, 5)
      } else {
        counter.innerText = to
      }
    }
    updateCounter()
  })
}

countUp()

btn.addEventListener('click', () => setTimeout(countUp))
