const navbar = document.querySelector('.navbar')
const nav = document.querySelector('.nav')
const navBtn = navbar.querySelector('.nav_btn')

navBtn.addEventListener('click', () => {
  if (nav.classList.contains('collapsed')) {
    nav.classList.remove('collapsed')
  } else {
    nav.classList.add('collapsed')
  }
  if (navbar.classList.contains('collapsed')) {
    navbar.classList.remove('collapsed')
  } else {
    navbar.classList.add('collapsed')
  }
})

const search = document.querySelector('.searchbar')
const searchBtn = search.querySelector('.search-btn')
const searchInput = search.querySelector('.search-input')

searchBtn.addEventListener('click', function () {
  if (searchInput.classList.contains('active')) searchInput.classList.remove('active')
  else searchInput.classList.add('active')
})