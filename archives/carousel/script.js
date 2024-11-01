const banners = document.querySelector('.banners')
const imgs = document.querySelectorAll('.banners img')
const btnContainer = document.querySelector('.btns')

for (let i = 0; i < imgs.length; i++) {
  const btn = document.createElement('button')
  btn.classList.add('btn')
  btnContainer.appendChild(btn)
}

let idx = 0

const btns = document.querySelectorAll('.btns .btn')

btns.forEach((el, index, els) => {
  el.addEventListener('click', () => {
    els.forEach((e) => e.classList.remove('active'))
    el.classList.add('active')
    idx = index - 1
    run()
    resetInterval()
  })
})

let interval = setInterval(run, 2000)

function run() {
  btns.forEach((e) => e.classList.remove('active'))
  btns[++idx % imgs.length].classList.add('active')
  idx %= imgs.length
  banners.style.transform = `translateX(${-idx * 500}px)`
}

function resetInterval() {
  clearInterval(interval)
  interval = setInterval(run, 2000)
}
