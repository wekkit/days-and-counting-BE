const socket = io('http://localhost:3000')

const btns = document.getElementsByClassName('btn')

socket.on('connect', () => {
  console.log('connected to socket')
})

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const roomId = urlParams.get('roomId')

Array.from(btns).forEach((btn) => {
  btn.addEventListener('click', () => {
    socket.emit('channel', { value: btn.value, roomId })
  })
})
