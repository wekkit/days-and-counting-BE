const socket = io('http://localhost:3000')

let roomId = ''
const btn = document.getElementById('btn')
const text = document.getElementById('text')

socket.on('connect', () => {
  socket.on(String(socket.id), (id) => {
    console.log(id)
    roomId = id
    text.innerHTML = roomId
  })
  socket.on('message', (data) => {
    console.log('message', data)
  })
})

btn.addEventListener('click', () => {
  socket.emit(roomId, { hello: 'world' })
})
