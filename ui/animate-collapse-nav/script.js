const navbar = document.querySelector('.navbar')
const nav = document.querySelector('.nav')
const navBtn = navbar.querySelector('.nav_btn')

navBtn.addEventListener('click', () => {
    if(nav.classList.contains('collapsed')) {
        nav.classList.remove('collapsed')
    } else {
        nav.classList.add('collapsed')
    }
    if(navbar.classList.contains('collapsed')) {
        navbar.classList.remove('collapsed')
    } else {
        navbar.classList.add('collapsed')
    }
})