let wrapper = document.querySelector('.wrapper');
let header = wrapper.querySelector('.header');

header.addEventListener('mousedown', () => {
  header.classList.add('move'); // 改变鼠标样式
  wrapper.addEventListener('mousemove', onDrag);
})
document.addEventListener('mouseup', () => {
  header.classList.remove('move'); // 移除鼠标样式
  wrapper.removeEventListener('mousemove', onDrag);
});

function onDrag(ev) {
  let style = window.getComputedStyle(wrapper); // 获取节点样式
  let left = parseInt(style.left),
      top = parseInt(style.top);
  let {movementX, movementY} = ev;
  wrapper.style.left = `${left + movementX}px`;
  wrapper.style.top = `${top + movementY}px`;
}