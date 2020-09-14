const socket = io('http://localhost:3000')
const qrcode = new QRCode('qr-remote')

let roomId = ''
const btn = document.getElementById('btn')
const text = document.getElementById('text')

socket.on('connect', () => {
  socket.on(String(socket.id), (id) => {
    console.log(id)
    roomId = id
    text.innerHTML = roomId
    qrcode.makeCode(`http://localhost:5000/remote.html?id=${roomId}`)
  })

  socket.on('message', (data) => {
    console.log('message', data)
  })
})

btn.addEventListener('click', () => {
  socket.emit(roomId, { hello: 'world' })
})
