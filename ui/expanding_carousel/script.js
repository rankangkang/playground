let container = document.querySelector('.container');
container.addEventListener('click', e => {
  // console.log(e);
  removeClass();
  e.target.classList.add('active');
});

function removeClass() {
  let panel = container.querySelector('.panel.active');
  panel.classList.remove('active');
}

let main = document.querySelector('.main');
let panels = main.querySelectorAll('.panel');
console.log(panels);
setInterval(slide(), 2000);

function slide() {
  let index = 0;
  return function() {
    for(let i = 0; i < panels.length; i++) {
      panels[i].classList.remove('show');
    }
    panels[index].classList.add('show');
    index = (index + 1) % 5;
  }
}