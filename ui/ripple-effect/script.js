const rippleContainers = document.querySelectorAll('.ripple')
// rippleContainers.forEach(ripple => {
//   ripple.addEventListener('click', function (e) {
//       const circle = document.createElement('span')
//       circle.classList.add('circle')
//       circle.style.top = e.offsetY + 'px'
//       circle.style.left = e.offsetX + 'px'

//       ripple.appendChild(circle)

//       setTimeout(() => circle.remove(), 1000)
//   })
// })

rippleContainers.forEach(ripple => {
  ripple.addEventListener('click', function (e) {
    const ripWidth = window.getComputedStyle(ripple).width
      const circle = document.createElement('span')
      circle.classList.add('circle')
      circle.style = `
        position: absolute;
        background-color: #eee;
        top: ${e.offsetY}px;
        left: ${e.offsetX}px;
        width: ${ripWidth};
        height: ${ripWidth};
        border-radius: 50%;
        opacity: .8;
        transform: translate(-50%, -50%) scale(3);
      `
      ripple.appendChild(circle)
      const animate = circle.animate([
        { transform: 'translate(-50%, -50%) scale(0)' },
        { opacity: 0 }
      ], { 
        duration: 500
      })
      const rmEl = function() {
        animate.removeEventListener('finish', rmEl)
        circle.remove()
      }
      animate.addEventListener('finish', rmEl)
  })
})