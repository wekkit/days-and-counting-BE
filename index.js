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
    const url = `/remote?roomId=${roomId}`
    link.href = url
    qrcode.makeCode(url)
  })

  socket.on('message', (data) => {
    console.log('message received:', data)
    channel.innerHTML = data.value
  })
})
