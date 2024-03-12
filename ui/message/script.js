let val = ''

const types = [
  'danger',
  'success',
  'info'
]

const input = document.querySelector('.add>input')
const btn = document.querySelector('.add>button')
const msgs = document.querySelector('.messages')
input.addEventListener('input', handleInputChange)
btn.addEventListener('click', handleBtnClick)
input.addEventListener('keyup', handleKeyUp)

function handleInputChange(e) {
  val = e.target.value
}

function handleBtnClick() {
  console.log(val)
  if(val.length === 0) return
  addMessage()
  input.value = ''
}

function handleKeyUp(e) {
  if(e.keyCode === 13) handleBtnClick()
}


function addMessage() {
  const getClassName = () => {
    return types[Math.floor(Math.random() * types.length)]
  }
  const msg = document.createElement('div')
  msg.classList.add('msg')
  msg.classList.add(getClassName())
  msg.innerHTML = `
    <span>${val}</span>
    <button>
      <svg t="1630405654508" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5217" width="200" height="200"><path d="M512 451.669333l-211.2-211.2L240.469333 300.8l211.2 211.2-211.2 211.2 60.330667 60.330667 211.2-211.2 211.2 211.2 60.330667-60.330667-211.2-211.2 211.2-211.2-60.330667-60.330667-211.2 211.2z" p-id="5218" fill="#515151"></path></svg>
    </button>`
  msgs.prepend(msg)
  setTimeout(() => {msg.remove()}, 2000)
}