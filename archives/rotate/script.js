const btn = document.querySelector('.btn')
const wrapper = document.querySelector('.wrapper')
const nav = document.querySelector('nav')

btn.addEventListener('click', () => {
  if (wrapper.classList.contains('rotate')) {
    wrapper.classList.remove('rotate')
    nav.classList.remove('active')
  } else {
    wrapper.classList.add('rotate')
    nav.classList.add('active')
  }
})
