const search = document.querySelector('.search');
const btn = search.querySelector('.btn');
      input = search.querySelector('.input');

btn.addEventListener('click', function() {
  if(input.classList.contains('active')) input.classList.remove('active');
  else input.classList.add('active');
})