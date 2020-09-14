const socket = io('http://localhost:3000')
const qrcode = new QRCode('qr-remote')

let roomId = ''
const code = document.getElementById('code')
const link = document.getElementById('link')
const channel = document.getElementById('channel')

socket.on('connect', () => {
  socket.on(String(socket.id), (id) => {
    console.log('room code received:', id)
    roomId = id
    code.innerHTML = roomId
    link.href = `/remote?roomId=${roomId}`
    qrcode.makeCode(`http://localhost:5000/remote.html?roomId=${roomId}`)
  })

  socket.on('message', (data) => {
    console.log('message received:', data)
    channel.innerHTML = data.value
  })
})
