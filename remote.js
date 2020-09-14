const socket = io('http://localhost:3000')

const btn = document.getElementById('btn')

socket.on('connect', () => {
  console.log('connected')
})

btn.addEventListener('click', () => {
  const roomId = document.getElementById('roomId')
  const channelInput = document.getElementById('channel')
  const idVal = String(roomId.value)
  const channel = channelInput.value
  socket.emit('channel', { channel, idVal })
})
