const socket = io('http://localhost:3000')

const btns = document.getElementsByClassName('btn')
const sendBtn = document.getElementById('sendBtn')
const input = document.getElementById('input')

socket.on('connect', () => {
  console.log('connected to socket')
})

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const roomId = urlParams.get('roomId')

Array.from(btns).forEach((btn) => {
  btn.addEventListener('click', () => {
    input.value = input.value + btn.value
  })
})

sendBtn.addEventListener('click', () => {
  const value = input.value
  socket.emit('channel', { value, roomId, test: 'hello' })
})
